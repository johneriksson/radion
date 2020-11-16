import React from "react";
import { useMutation } from "urql";
import Button from "../components/Button";
import Input from "../components/Input";

import "./Register.css"

const REGISTER_MUT = `
mutation Register($username: String!, $password: String!) {
	register(options: { username: $username, password: $password }) {
		errors {
			field
			message
		}
		user {
			id
			username
		}
	}
}
`;

const Register = () => {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");

	const [, register] = useMutation(REGISTER_MUT);

	const onSubmit = React.useCallback(
		(e) => {
			e.preventDefault();
			console.log("email", email);
			console.log("password", password);
			register({ username: email, password: password });
		},
		[email, password, register]
	);

	return (
		<div className="register">
			<h1>Register</h1>
			<form onSubmit={onSubmit}>
				<Input
					name="email"
					type="email"
					label="Email"
					value={email}
					onChange={e => setEmail(e.target.value)}
					required
				/>

				<Input
					name="password"
					type="password"
					label="Password"
					value={password}
					onChange={e => setPassword(e.target.value)}
					required
				/>

				<Button
					type="submit"
					title="Submit"
				/>
			</form>
		</div>
	);
}

export default Register;