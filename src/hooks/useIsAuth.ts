import React from "react";
import { useHistory } from "react-router-dom";
import { useMeQuery } from "../generated/graphql";

export const useIsAuth = () => {
	const [{ data, fetching }] = useMeQuery();
	const history = useHistory();
	
	React.useEffect(() => {
		if (!fetching && !data?.me) {
			// TODO: Pass a state so that we can display message to user on login page
			history.push({
				pathname: "/login",
				state: {
					returnTo: history.location.pathname,
				},
			});
		}
	}, [fetching, data, history]);
}