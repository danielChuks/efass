import React from "react";
import styles from './index.module.scss'

interface SelectGroupProps {
    name:string
    value?: string;
    label: string;
    disabled?: boolean;
    placeholder?: string;
    required?: boolean;
    options?: any[];
    handleChange?: (e: any) => void;
}

export const SelectGroup = ({
	name,
	handleChange,
	value,
    label,
    disabled,
	options = [],
	placeholder,
	required,
}:SelectGroupProps) => {
return(
    <div className={styles["select_Group"]}>
    <label>{label}</label>
    <select className={styles["select"]} name={name} onChange={handleChange} value={value} required={required}>
			<option value=''>{placeholder ? placeholder : "--- Select ---"}</option>
			{options.map((option) => (
				<option
					key={option}
					value={option}>
					{option}
				</option>
			))}
		</select>
    
</div>
)
}