import React from 'react';
import styles from './index.module.scss';

interface InputGroupProps {
    isError?: boolean;
    errorText?: string;
    accept?: string;
    id?: string;
    name: string;
    value?: string;
    label: string;
    type: string;
    disabled?: boolean;
    placeholder?: string;
    maxLength?: number;
    required?: boolean;
    handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputGroup({
    accept,
    label,
    id,
    type,
    disabled,
    value,
    name,
    placeholder,
    maxLength,
    required,
    handleChange,
    errorText,
    isError,

}: InputGroupProps) {
    return (
        <div className={styles['input_Group']}>
            <label>{label}</label>
            <input
                accept={accept}
                id={name}
                type={type}
                value={value}
                name={name}
                disabled={disabled}
                maxLength={maxLength}
                placeholder={placeholder}
                required={required}
                onChange={handleChange}
            />
            {isError && <p className={styles['error_text']}>{errorText}</p>}

        </div>
    );
}

export default InputGroup;
