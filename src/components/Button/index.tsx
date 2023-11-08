import React from "react";
import styles from "./index.module.scss";
import { ImSpinner8 } from "react-icons/im";

interface SettingsButtonProps {
    text: string;
    disabled?: boolean;
    error?: boolean;
    errorText?: string;
    type?: string;
    handleAction?: (value: any) => void;
    loading?: boolean;
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
}: SettingsButtonProps) => {
    return (
        <>
            <button
                disabled={disabled}
                onClick={handleAction}
                className={styles["button"]}
                type='submit'
            >
                {loading ? (
                    <div className={styles["spinner"]}>
                        <ImSpinner8 size={30} />
                    </div>
                ) : (
                    text
                )}
            </button>
            {error && <p className={styles["error_msg"]}>{errorText}</p>}
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
