import { Cache, cacheExchange, QueryInput, Resolver } from "@urql/exchange-graphcache";
import { Client, createClient, dedupExchange, Exchange, fetchExchange, stringifyVariables } from "urql";
import { pipe, tap } from "wonka";
import { ChangePasswordMutation, LoginMutation, LogoutMutation, MeDocument, MeQuery, RegisterMutation } from "../generated/graphql";
import history from "./history";

const errorExchange: Exchange = ({ forward }) => (ops$) => {
	return pipe(
		forward(ops$),
		tap(({ error }) => {
			if (error?.message.includes("authenticated")) {
				history.replace({
					pathname: "/login",
					state: {
						message: "You need to be logged in to do that!",
						returnTo: window.location.pathname,
					},
				});
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

const cursorPagination = (): Resolver => {
	return (_parent, fieldArgs, cache, info) => {
		const { parentKey: entityKey, fieldName } = info;
		const allFields = cache.inspectFields(entityKey);
		const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
		if (!fieldInfos.length) {
			return undefined;
		}

		const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
		const isItInTheCache = cache.resolve(
			cache.resolveFieldByKey(entityKey, fieldKey) as string,
			"items"
		);
		info.partial = !isItInTheCache;
		let hasMore = true;
		const results: string[] = [];
		fieldInfos.forEach((fi) => {
			const key = cache.resolveFieldByKey(entityKey, fi.fieldKey) as string;
			const data = cache.resolve(key, "items") as string[];
			const _hasMore = cache.resolve(key, "hasMore");
			if (!_hasMore) {
				hasMore = _hasMore as boolean;
			}
			results.push(...data);
		});

		return {
			__typename: "PaginatedResponse",
			hasMore,
			items: results,
		};
	};
};

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
				keys: {
					PaginatedResponse: () => null,
				},
				resolvers: {
					Query: {
						channels: cursorPagination(),
					},
				},
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