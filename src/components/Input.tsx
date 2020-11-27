import React from "react";

import "./Input.css";

interface Props {
	name: string,
	label?: string,
	type?: string,
	value: string,
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
	required?: boolean,
	errorMessage?: string,
}

const Input: React.FC<Props> = ({
	name,
	label,
	type = "text",
	value,
	onChange,
	required,
	errorMessage,
}) => {

	return (
		<div className="input">
			{label && (
				<label htmlFor={name}>{label}</label>
			)}
			<input
				name={name}
				type={type}
				value={value}
				onChange={onChange}
				required={required}
			/>
			{errorMessage && <p className="error">{errorMessage}</p>}
		</div>
	);
}

export default Input;