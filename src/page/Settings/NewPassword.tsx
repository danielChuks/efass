"use client";
import { useState } from "react";
import styles from "./index.module.scss";
import InputGroup from "@/components/Input";
import { SettingsButton } from "@/components/Button";

function NewPassword() {
	const [data, setData] = useState({ password: "", confirmPassword: "" });
	const handleInputchange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};
	return (
		<main className={styles["change_password"]}>
			<p className={styles["title"]}>Choose a new password</p>

			<div className={styles["content"]}>
				<InputGroup
					type='text'
					label='New Password'
					value={data.password}
					name='password'
					placeholder=''
					handleChange={handleInputchange}
				/>

				<InputGroup
					type='text'
					label='Confirm New Password'
					value={data.confirmPassword}
					name='confirmPassword'
					placeholder=''
					handleChange={handleInputchange}
				/>

				<SettingsButton
					text={"Change Password"}
					// handleAction={navigatePassword}
					// error={error}
					// errorText={errorText}
				/>
			</div>
		</main>
	);
}

export default NewPassword;
