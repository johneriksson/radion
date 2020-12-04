import React from "react";
import { useMeQuery } from "../generated/graphql";

type User = {
	id: number,
	username: string
} | null;

export function useUser(): [User | null, (user: User | null) => void] {
	const [user, setUser] = React.useState<User | null>(null);
	const [{ data, fetching }] = useMeQuery();

	React.useEffect(() => {
		if (data?.me?.id) {
			setUser({
				id: data.me.id,
				username: data.me.username,
			});
		}
	}, [data, fetching, setUser]);

	return [user, setUser];
}