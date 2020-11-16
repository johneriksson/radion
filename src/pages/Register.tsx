import React from "react";
import { useMutation } from "urql";
import Button from "../components/Button";

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

interface Props {

}

const Register: React.FC<Props> = ({

}) => {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");

	const [{ }, register] = useMutation(REGISTER_MUT);

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
		<div>
			<h1>Register</h1>
			<form onSubmit={onSubmit}>
				<input
					type="email"
					value={email}
					onChange={e => setEmail(e.target.value)}
					placeholder="Email"
					required
				/>
				<input
					type="password"
					value={password}
					onChange={e => setPassword(e.target.value)}
					placeholder="Password"
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