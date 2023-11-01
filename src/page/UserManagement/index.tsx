"use client";
import styles from "../Home/index.module.scss";
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

  const columnHeader = [
    { id: "1", label: "S/NO", minWidth: 170 },
    { id: "2", label: "USERNAME", minWidth: 170 },
    { id: "3", label: "EMAIL ADDRESS", minWidth: 170 },
    { id: "4", label: "LAST ACTIVITY DATE", minWidth: 100 },
    { id: "5", label: "STATUS", minWidth: 170 },
    { id: "6", label: "ACTION", minWidth: 100 },
  ];

  // console.log(darkMode);
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
        <div className={styles["table_body"]}>
          <div className={styles["contentTopSection"]}>
            <SearchBar />
            <Filter />
          <CustomButton
            text={"Create User"}
            icon={<BsPlusLg size={18} />}
            handleAction={addUser}
          />
          </div>
          <div style={{ height: 320, width: "100%", padding: "1rem 0 1rem 0" }}>
            <MaterialTable columnHeader={columnHeader} />
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};
