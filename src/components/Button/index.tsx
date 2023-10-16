import React from "react";
import styles from "./index.module.scss";

interface SettingsButtonProps {
	text: string;
	disabled?: boolean;
	error?: boolean;
	errorText?: string;
	handleAction?: (value: any) => void;
}

export const SettingsButton = ({
	text,
	disabled,
	error,
	errorText,
	handleAction,
}: SettingsButtonProps) => {
	return (
		<>
			<button
				disabled={disabled}
				onClick={handleAction}
				className={styles["button"]}
			>
				{text}
			</button>
			{error && <p className={styles["error_msg"]}>{errorText}</p>}
		</>
	);
};
