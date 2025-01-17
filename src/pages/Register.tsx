import React from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { FieldError, useRegisterMutation } from "../generated/graphql";
import { useRedirectIfLoggedIn } from "../hooks/useRedirectIfLoggedIn";
import { useUser } from "../hooks/useUser";

import "./AuthPage.css";

const Register = () => {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [errors, setErrors] = React.useState<FieldError[]>([]);
	const [, setUser] = useUser();
	useRedirectIfLoggedIn();

	const [, register] = useRegisterMutation();

	const onSubmit = React.useCallback(
		async (e) => {
			e.preventDefault();
			const response = await register({ options: { username: email, password: password } });
			if (response.data?.register.errors) {
				setErrors(response.data.register.errors);
				return;
			}

			if (!response.data?.register.user) {
				setErrors([{
					field: "general",
					message: "Something went wrong...",
				}]);
				return;
			}

			setUser(response.data.register.user);
			setErrors([]);
			setEmail("");
			setPassword("");
		},
		[email, password, register, setUser]
	);

	const generalErrorMessage = errors.find(e => e.field === "general")?.message;
	return (
		<div className="form-page">
			<h1>Register</h1>

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

export default Register;