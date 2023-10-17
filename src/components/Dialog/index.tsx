import React, { useState } from "react";
import styles from "./index.module.scss";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { SettingsButton } from "../Button";
import InputGroup from "../Input";
import { AiOutlineClose } from "react-icons/ai";

interface DialogProps {
	openModal: boolean;
	header: string;
	data: any;
	error: boolean;
	errorText: string;
	setOpenModal: (value: boolean) => void;
	handleAction: (value: any) => void;
	setData: (value: any) => void;
	handleInputchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function index({
	openModal,
	header,
	data,
	error,
	errorText,
	setOpenModal,
	handleAction,
	handleInputchange,
}: DialogProps) {
	return (
		<div>
			<Dialog
				open={openModal}
				sx={{ width: "40rem", margin: "auto", px: 2 }}
				onClose={() => setOpenModal(false)}
				aria-labelledby='alert-dialog-title'
			>
				<DialogTitle
					id='alert-dialog-title'
					sx={{
						backgroundColor: "#DFE9FF",
						color: "#0D1740",
						fontWeight: "bold",
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<p>{header}</p>
					<AiOutlineClose onClick={() => setOpenModal(false)} size={24} />
				</DialogTitle>

				<DialogContent>
					<div className={styles["dialog_content"]}>
						<InputGroup
							type='text'
							label='Username'
							value={data?.username}
							name='username'
							placeholder=''
							handleChange={handleInputchange}
							required={true}
						/>

						<InputGroup
							type='email'
							label='Email Address'
							value={data?.email}
							name='email'
							placeholder=''
							handleChange={handleInputchange}
							required={true}
						/>

						<InputGroup
							type='password'
							label='Password'
							value={data.password}
							name='password'
							placeholder=''
							handleChange={handleInputchange}
							required={true}
						/>

						<InputGroup
							type='password'
							label='Confirm Password'
							value={data.confirmPassword}
							name='confirmPassword'
							placeholder=''
							handleChange={handleInputchange}
							required={true}
						/>

						<SettingsButton
							text={"Create User"}
							handleAction={handleAction}
							error={error}
							errorText={errorText}
						/>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default index;
