import React from "react";
import { useHistory, useParams } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { FieldError, useChangePasswordMutation } from "../generated/graphql";
import { useUser } from "../hooks/useUser";

import "./AuthPage.css";

interface Params {
	token: string,
};

const ChangePassword = () => {
	const history = useHistory();
	const { token } = useParams<Params>();
	const [newPassword, setNewPassword] = React.useState("");
	const [confirmPassword, setConfirmPassword] = React.useState("");
	const [errors, setErrors] = React.useState<FieldError[]>([]);
	const [, setUser] = useUser();

	const [, changePassword] = useChangePasswordMutation();

	const onSubmit = React.useCallback(
		async (e) => {
			e.preventDefault();
			if (newPassword !== confirmPassword) {
				setErrors([{
					field: "general",
					message: "Password fields don't match.",
				}]);
				return;
			}

			const response = await changePassword({ newPassword, token });
			if (response.data?.changePassword.errors) {
				setErrors(response.data.changePassword.errors);
				return;
			}

			setNewPassword("");
			setConfirmPassword("");

			setUser(response.data!.changePassword!.user!);
			history.replace("/");
		},
		[newPassword, confirmPassword, token, changePassword, setNewPassword, setConfirmPassword, setErrors, setUser, history],
	);

	const generalErrorMessage = errors.find(e => e.field === "general")?.message;
	return (
		<div className="auth-page">
			<h1>Change password</h1>

			<form onSubmit={onSubmit}>

				<Input
					name="newPassword"
					type="password"
					label="New password"
					value={newPassword}
					onChange={e => setNewPassword(e.target.value)}
					required
					errorMessage={errors.find(e => e.field === "password")?.message}
				/>

				<Input
					name="confirmPassword"
					type="password"
					label="Confirm new password"
					value={confirmPassword}
					onChange={e => setConfirmPassword(e.target.value)}
					required
					errorMessage={errors.find(e => e.field === "confirmPassword")?.message}
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

export default ChangePassword;