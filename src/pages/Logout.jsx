import React from "react";
import { useHistory } from "react-router-dom";
import { useUser } from "../hooks/useUser";

const Logout = () => {
	const history = useHistory();
	const [, setUser] = useUser();

	React.useEffect(() => {
		console.log("LOGGING OUT!");

		// TODO: Actually log out with cookies n stuff

		setUser(null);
		history.replace("/");
	}, [setUser, history]);

	return null;
}

export default Logout;