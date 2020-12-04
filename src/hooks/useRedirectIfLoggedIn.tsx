import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useUser } from "./useUser";

interface LocationState {
	returnTo?: string;
}

export function useRedirectIfLoggedIn() {
	const [user] = useUser();
	const history = useHistory();
	const location = useLocation();

	React.useEffect(() => {
		// Check if we are already logged in and redirect if we are
		if (user?.username) {
			console.log("redirecting from useRedirectIfLoggedIn");
			const pathname = (location.state as LocationState)?.returnTo ?? "/";
			history.replace(pathname);
		}
	}, [user, history, location]);
}