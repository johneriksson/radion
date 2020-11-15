import React from "react";

import "./Button.css"

interface Props {
    title: string,
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
}

const Button: React.FC<Props> = ({
    title,
    onClick,
}) => {

    return (
        <button className="button" onClick={onClick}>
            <span>{title}</span>
        </button>
    );
}

export default Button;