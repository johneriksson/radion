import { Cache, cacheExchange, QueryInput } from "@urql/exchange-graphcache";
import { Client, createClient, dedupExchange, Exchange, fetchExchange } from "urql";
import { pipe, tap } from "wonka";
import { ChangePasswordMutation, LoginMutation, LogoutMutation, MeDocument, MeQuery, RegisterMutation } from "../generated/graphql";
import history from "./history";

const errorExchange: Exchange = ({ forward }) => (ops$) => {
	return pipe(
		forward(ops$),
		tap(({ error }) => {
			if (error?.message.includes("authenticated")) {
				// TODO: Pass a state so that we can display message to user on login page
				history.push("/login");
			}
		})
	)
}

function betterUpdateQuery<Result, Query>(
	cache: Cache,
	qi: QueryInput,
	result: any,
	fn: (r: Result, q: Query) => Query,
) {
	return cache.updateQuery(qi, data => fn(result, data as any) as any);
}

export const createUrqlClient: () => Client = () => {
	return createClient({
		// url: "http://192.168.10.128:4000/graphql",
		url: "http://localhost:4000/graphql",
		fetchOptions: {
			credentials: "include",
		},
		exchanges: [
			dedupExchange,
			cacheExchange({
				updates: {
					Mutation: {
						login: (result, _args, cache, _info) => {
							betterUpdateQuery<LoginMutation, MeQuery>(
								cache,
								{ query: MeDocument },
								result,
								(r, q) => {
									if (r.login.errors) {
										return q;
									} else {
										return {
											me: r.login.user,
										}
									}
								}
							);
						},
						register: (result, _args, cache, _info) => {
							betterUpdateQuery<RegisterMutation, MeQuery>(
								cache,
								{ query: MeDocument },
								result,
								(r, q) => {
									if (r.register.errors) {
										return q;
									} else {
										return {
											me: r.register.user,
										}
									}
								}
							);
						},
						logout: (result, _args, cache, _info) => {
							betterUpdateQuery<LogoutMutation, MeQuery>(
								cache,
								{ query: MeDocument },
								result,
								(r, q) => ({ me: null })
							);
						},
						changePassword: (result, _args, cache, _info) => {
							betterUpdateQuery<ChangePasswordMutation, MeQuery>(
								cache,
								{ query: MeDocument },
								result,
								(r, q) => {
									if (r.changePassword.errors) {
										return q;
									} else {
										return {
											me: r.changePassword.user,
										}
									}
								}
							);
						},
					}
				}
			}),
			errorExchange,
			fetchExchange,
		],
	});
}