"use client";
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
import { MaterialTable } from "../../components/MaterialTable";
import SearchBar from "../../components/SearchBar";
import Filter from "../../components/FilterBy";
import { useUserListActions } from "../../actions/userManagement";
import { userAtom } from "../../state/userList";
import { PaginatedTable } from "@/components/PaginatedTable";
import { userData } from "./data";
import { User } from "@/interfaces";
import styles from "./index.module.scss";

export const UserManagement = () => {
    const handleCreateUser = () => {
        console.log(data);
    };
    const { getSettings } = useSettingsActions();
    const [loading, setLoading] = useState(true);
    const darkMode = useRecoilValue(settingsAtom);
    const [openModal, setOpenModal] = useState(false);
    const [modalHeader, setModalHeader] = useState("Create User");
    const [modalAction, setModalAction] = useState(() => handleCreateUser);
    //form data
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState("");
    const { handleuserList } = useUserListActions();
    // const userData = useRecoilValue(userAtom);
    const addUser = () => {
        setModalHeader("Create User");
        setOpenModal(true);
        setData({ username: "", email: "", password: "", confirmPassword: "" });
        setModalAction(() => handleCreateUser);
    };

    useEffect(() => {
        getSettings();
        fetchData();
    }, [getSettings]);
    const fetchData = async () => {
        try {
            await handleuserList();
            console.log(userData);
        } catch (error) {
            console.error(error);
        }
    };
    const handleInputchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const editUser = (data: User) => {
        setModalHeader("Edit User");
        setData({
            username: data.userName,
            email: data.email,
            password: "",
            confirmPassword: "",
        });
        console.log(data);
        setOpenModal(true);
        setModalAction(() => handleEditUser);
    };
    const handleEditUser = () => {
        console.log("edittt");
    };

    // console.log(darkMode);
    return (
        <BaseLayout page={DASHBOARD_PAGES.USER_MANAGEMENT}>
            {openModal && (
                <Dialog
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    handleAction={modalAction}
                    header={modalHeader}
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
            <div className={styles["contentContainer"]}>
                <div className={styles["table_body"]}>
                    <div className={styles["contentTopSection"]}>
                        <SearchBar />
                        <Filter />
                        <div className={styles["righSide"]}>
                            <div className={styles["rightSide"]}>
                                <div
                                    className={styles["reportButton"]}
                                    onClick={addUser}
                                >
                                    Create User
                                    <BsPlusLg size={22} color={"#fff"} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <PaginatedTable<User>
                        headers={[
                            "USERNAME",
                            "EMAIL ADDRESS",
                            "LAST ACTIVITY DATE",
                            "STATUS",
                            "ACTION",
                        ]}
                        data={userData}
                        // loading={loading}
                        columns={[
                            {
                                render: (data, index) => {
                                    return data.userName;
                                },
                                width: "30%",
                            },
                            {
                                render: (data, index) => {
                                    return data.email;
                                },
                                width: "50%",
                            },

                            {
                                render: (data, index) => {
                                    return data.lastActivityDate;
                                },
                                width: "50%",
                            },
                            {
                                render: (data, index) => {
                                    if (data.status === "Active") {
                                        return (
                                            <button
                                                className={
                                                    styles[
                                                        "styledButton_active"
                                                    ]
                                                }
                                            >
                                                {data.status}
                                            </button>
                                        );
                                    } else {
                                        return (
                                            <button
                                                className={
                                                    styles[
                                                        "styledButton_inactive"
                                                    ]
                                                }
                                            >
                                                {data.status}
                                            </button>
                                        );
                                    }
                                },
                                width: "50%",
                            },
                            {
                                render: (data, index) => {
                                    return (
                                        <div
                                            className={styles["viewButton"]}
                                            onClick={() => {
                                                editUser(data);
                                            }}
                                        >
                                            ...
                                        </div>
                                    );
                                },
                                width: "10%",
                            },
                        ]}
                    />
                </div>
            </div>
        </BaseLayout>
    );
};
