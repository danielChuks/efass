import React from "react";
import styles from './index.module.scss'

interface SelectGroupProps {
    errorText?:string
    isError?:boolean
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
    errorText,
    isError,
}: SelectGroupProps) => {
    return (
        <div className={styles['select_Group']}>
            <label>{label}</label>
            <select
                className={styles['select']}
                name={name}
                onChange={handleChange}
                value={value}
                required={required}
            >
                <option value="">
                    {placeholder ? placeholder : '--- Select ---'}
                </option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            {isError && <p className="error_text">{errorText}</p>}
        </div>
    );
};
