"use client";
import React, { useState } from "react";
import { PaginatedTable } from "@/components/PaginatedTable";
import styles from "./index.module.scss";
import SearchBar from "@/components/SearchBar";
import Filter from "@/components/FilterBy";
import { CustomButton } from "@/components/Button";
import { GL } from "@/interfaces";
import { BsPlusLg } from "react-icons/bs";
import { dummyData } from "./data";
import { GlDialog } from "@/components/GlDialog";

function GlMappingContent() {
	const handleAddNewGl = () => {
		console.log("add new gl");
	};
	const [error, setError] = useState(false);
	const [errorText, setErrorText] = useState("");
	const [loading, setLoading] = useState<boolean>(true);
    const [typeOfModal, setTypeOfModal] = useState<string>("");
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [modalHeader, setModalHeader] = useState("Add New");
	const [modalAction, setModalAction] = useState(() => handleAddNewGl);
	const [data, setData] = useState<GL>({
		statement_code: "",
		statement_description: "",
		item_code: "",
		item_description: "",
		ledger_number: "",
	});

	const handleInputchange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	//listen for click on add button
	const openAddModal = () => {
        setTypeOfModal("")
		setModalHeader("Add New");
		setOpenModal(true);
		setData({
			statement_code: "",
			statement_description: "",
			item_code: "",
			item_description: "",
			ledger_number: "",
		});
		setModalAction(() => handleAddNewGl);
	};
    const openEditModal = (data: GL) => {
        setTypeOfModal("editModal")
        setModalHeader("Edit Details");
        setData({
            statement_code: data.statement_code,
            statement_description: data.statement_description,
            item_code: data.item_code,
            item_description: data.item_description,
            ledger_number: data.ledger_number,
        });
        console.log(data);
        setOpenModal(true);
        setModalAction(() => editGl);
    };
	const editGl = (data: GL) => {
		console.log("edit meee", data);
	};
	return (
		<div className={styles["content"]}>
			{openModal && (
				<GlDialog
					openModal={openModal}
					setOpenModal={setOpenModal}
					handleAction={modalAction}
					header={modalHeader}
					data={data}
					setData={setData}
					handleInputchange={handleInputchange}
					error={error}
					errorText={errorText}
                    typeOfModal={typeOfModal}
				/>
			)}
			<div className={styles["content_header"]}>
				<div className={styles["search"]}>
					<SearchBar />
					<Filter options={[]} />
				</div>

				<CustomButton
					text={"Add New"}
					icon={<BsPlusLg size={22} color={"#fff"} />}
					handleAction={openAddModal}
				/>
			</div>
			<PaginatedTable<GL>
				headers={[
					"STATEMENT CODE",
					"STATEMENT DESCRIPTION",
					"ITEM CODE",
					"ITEM DESCRIPTION",
					"LEDGER NUMBER",
					"ACTION",
				]}
				data={dummyData}
				// loading={loading}
				columns={[
					{
						render: (data, index) => {
							return data.statement_code;
						},
					},
					{
						render: (data, index) => {
							return data.statement_description;
						},
						width: "20%",
					},
					{
						render: (data, index) => {
							return data.item_code;
						},
						// width: '50%',
					},
					{
						render: (data, index) => {
							return data.item_description;
						},
						width: "15%",
					},
					{
						render: (data, index) => {
							return data.ledger_number;
						},
						// width: '50%',
					},
					{
						render: (data, index) => {
							return (
								<div
									className={styles["viewButton"]}
									onClick={() => {
										openEditModal(data);
									}}
								>
									View Details
								</div>
							);
						},
						width: "10%",
					},
				]}
			/>
		</div>
	);
}

export default GlMappingContent;
