import React from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { FieldError, useLoginMutation } from "../generated/graphql";
import { useIndexRedirectIfLoggedIn } from "../hooks/useIndexRedirectIfLoggedIn";
import { useUser } from "../hooks/useUser";

import "./AuthPage.css";

const Login = () => {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [errors, setErrors] = React.useState<FieldError[]>([]);
	const [, setUser] = useUser();
	useIndexRedirectIfLoggedIn();

	const [, login] = useLoginMutation();

	const onSubmit = React.useCallback(
		async (e) => {
			e.preventDefault();
			const response = await login({ options: { username: email, password: password } });
			if (response.data?.login.errors) {
				setErrors(response.data.login.errors);
				return;
			}

			if (!response.data?.login.user) {
				setErrors([{
					field: "general",
					message: "Something went wrong...",
				}]);
				return;
			}

			setUser(response.data.login.user);
			setErrors([]);
			setEmail("");
			setPassword("");
		},
		[email, password, login, setUser]
	);

	const generalErrorMessage = errors.find(e => e.field === "general")?.message;
	return (
		<div className="auth-page">
			<h1>Login</h1>

			<form onSubmit={onSubmit}>
				<Input
					name="email"
					type="email"
					label="Email"
					value={email}
					onChange={e => setEmail(e.target.value)}
					required
					errorMessage={errors.find(e => e.field === "username")?.message}
				/>

				<Input
					name="password"
					type="password"
					label="Password"
					value={password}
					onChange={e => setPassword(e.target.value)}
					required
					errorMessage={errors.find(e => e.field === "password")?.message}
				/>

				<Button
					type="submit"
					title="Submit"
				/>

				{generalErrorMessage && <p style={{ color: "var(--color-error)" }}>{generalErrorMessage}</p>}
			</form>
		</div>
	);
}

export default Login;