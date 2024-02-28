import React from "react";
import styles from "./index.module.scss";
import { ImSpinner8 } from "react-icons/im";

interface SettingsButtonProps {
    text: string;
    disabled?: boolean;
    error?: boolean;
    errorText?: string;
    type?: 'button' | 'submit' | 'reset';
    handleAction?: (value: any) => void;
    loading?: boolean;
    success?: boolean;
    successText?: string;
}

interface CustomButtonProps {
    text: string;
    icon?: any;
    handleAction?: (value: any) => void;
}

export const SettingsButton = ({
    text,
    disabled,
    error,
    errorText,
    type,
    handleAction,
    loading,
    success,
    successText,
}: SettingsButtonProps) => {
    return (
        <>
            <button
                disabled={disabled}
                onClick={handleAction}
                className={styles['button']}
                type={type}
            >
                {text}
            </button>
            {error && <p className={styles['error_msg']}>{errorText}</p>}
            {success && <p className={styles['success_text']}>{successText}</p>}
        </>
    );
};

export const CustomButton = ({
    text,
    icon,
    handleAction,
}: CustomButtonProps) => {
    return (
        <button onClick={handleAction} className={styles["customButton"]}>
            {text} {icon}
        </button>
    );
};
