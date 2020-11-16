import React from "react";

import "./Input.css"

interface Props {
	name: string,
	label?: string,
	type?: string,
	value: string,
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
	required?: boolean,
}

const Input: React.FC<Props> = ({
	name,
	label,
	type = "text",
	value,
	onChange,
	required,
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
		</div>
	);
}

export default Input;