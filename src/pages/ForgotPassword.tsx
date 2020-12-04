import React from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { FieldError, useForgotPasswordMutation } from "../generated/graphql";

import "./AuthPage.css";

const ForgotPassword = () => {
	const [email, setEmail] = React.useState("");
	const [errors, setErrors] = React.useState<FieldError[]>([]);

	const [, forgotPassword] = useForgotPasswordMutation();

	const onSubmit = React.useCallback(
		async (e) => {
			e.preventDefault();
			const response = await forgotPassword({ username: email });

			if (!response.data?.forgotPassword) {
				setErrors([{
					field: "general",
					message: "Something went wrong...",
				}]);
				return;
			}

			setErrors([]);
			setEmail("");
		},
		[email, forgotPassword]
	);

	const generalErrorMessage = errors.find(e => e.field === "general")?.message;
	return (
		<div className="form-page">
			<h1>Forgot password</h1>

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

				<Button
					type="submit"
					title="Submit"
				/>

				{generalErrorMessage && <p style={{ color: "var(--color-error)" }}>{generalErrorMessage}</p>}
			</form>
		</div>
	);
}

export default ForgotPassword;