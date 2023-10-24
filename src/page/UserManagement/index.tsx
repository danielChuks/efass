"use client";
import styles from "./index.module.scss";
import { useRecoilValue } from "recoil";
import { settingsAtom } from "../../state/settings";
import { useSettingsActions } from "../../actions/settings";
import { useEffect, useState } from "react";
import BaseLayout from "../../components/BaseLayout";
import Card from "../../components/Card/index";
import { CustomButton } from "@/components/Button";
import { BsPlusLg } from "react-icons/bs";
import Dialog from "../../components/Dialog";
import { DASHBOARD_PAGES } from "../../enums";


export const UserManagement = () => {
	const { getSettings } = useSettingsActions();
	const darkMode = useRecoilValue(settingsAtom);
	const [openModal, setOpenModal] = useState(false);
	const [data, setData] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [error, setError] = useState(false);
	const [errorText, setErrorText] = useState("");
	const addUser = () => {
		setOpenModal(true);
	};
	const createUser = () => {
		console.log(data);
	};
	useEffect(() => {
		getSettings();
	}, [getSettings]);

	const handleInputchange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	console.log(darkMode);
	return (
		<BaseLayout page={DASHBOARD_PAGES.USER_MANAGEMENT}>
			{openModal && (
				<Dialog
					openModal={openModal}
					setOpenModal={setOpenModal}
					handleAction={createUser}
					header={"Create User"}
					data={data}
					setData={setData}
					handleInputchange={handleInputchange}
					error={error}
					errorText={errorText}
				/>
			)}
			<div className={styles["container"]}>
				<h4>USER MANAGEMENT</h4>
			</div>
			<div className={styles["card-body"]}>
				<Card title={"Users Created"} content={"0"} />
				<Card title={"Active Users"} content={"0"} />
				<Card title={"Inactive Users"} content={"0"} />
			</div>
			<div className={styles["table_container"]}>
				<CustomButton
					text={"Create User"}
					icon={<BsPlusLg size={18} />}
					handleAction={addUser}
				/>
				<div className={styles["empty_state"]}>
					<img src='../empty.png' alt='' />
					<p>No data found</p>
				</div>
			</div>
		</BaseLayout>
	);
};
