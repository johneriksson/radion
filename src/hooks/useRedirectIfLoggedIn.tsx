import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { LocationState } from "../utils/locationState";
import { useUser } from "./useUser";


export function useRedirectIfLoggedIn() {
	const [user] = useUser();
	const history = useHistory();
	const location = useLocation<LocationState>();

	React.useEffect(() => {
		// Check if we are already logged in and redirect if we are
		if (user?.username) {
			console.log("redirecting from useRedirectIfLoggedIn");
			const pathname = location.state.returnTo ?? "/";
			history.replace({
				pathname,
				state: {} // Clear state
			});
		}
	}, [user, history, location]);
}