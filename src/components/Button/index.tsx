import React from "react";
import styles from "./index.module.scss";

interface SettingsButtonProps {
	text: string;
	disabled?: boolean;
	error?: boolean;
	errorText?: string;
	type?: string;
	handleAction?: (value: any) => void;
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
}: SettingsButtonProps) => {
	return (
		<>
			<button
				disabled={disabled}
				onClick={handleAction}
				className={styles["button"]}
				type="submit"
			>
				{text}
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
