import React from "react";
import styles from "./index.module.scss";

interface InputGroupProps {
    name:string
    value: string;
    label: string;
    type: string;
    disabled?: boolean;
    placeholder?: string;
    maxLength?: number;
    handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputGroup({label, type, disabled, value, name, placeholder, maxLength, handleChange}: InputGroupProps) {
	return (
		<div className={styles["input_Group"]}>
			<label>{label}</label>
			<input type={type} value={value} name={name} disabled={disabled} maxLength={maxLength} placeholder={placeholder} onChange={handleChange}/>
		</div>
	);
}

export default InputGroup;
