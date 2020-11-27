import React from "react";
import { useHistory } from "react-router-dom";
import { useUser } from "./useUser";

export function useIndexRedirectIfLoggedIn() {
	const [user] = useUser();
	const history = useHistory();

	React.useEffect(() => {
		// Check if we are already logged in and redirect if we are
		if (user?.username) {
			console.log("redirecting from useIndexRedirectIfLoggedIn");
			history.replace("/");
		}
	}, [user, history]);
}