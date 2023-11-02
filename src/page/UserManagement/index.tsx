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
import { useUserListActions } from "../../actions/userManagement";
import { userAtom } from "../../state/userList";

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
      const { handleuserList } = useUserListActions();
      const userData = useRecoilValue(userAtom); 
      const addUser = () => {
        setOpenModal(true);
      };
      const createUser = () => {
        console.log(data);
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

      const columnHeader = [
        { id: "username", label: "S/NO", minWidth: 170 },
        { id: "password", label: "USERNAME", minWidth: 170 },
        { id: "role", label: "EMAIL ADDRESS", minWidth: 170 },
        { id: "density", label: "LAST ACTIVITY DATE", minWidth: 100 },
        { id: "5", label: "STATUS", minWidth: 170 },
        { id: "6", label: "ACTION", minWidth: 100 },
      ];

      interface Data {
        username: string;
        password: string;
        role: string;
        density: string;
      }
      const userRows: Data[] = userData.map((user) => ({
        username: user.username,
        password: user.password,
        role: user.role,
        density: user.role, // Assuming 'lastActivityDate' is the relevant property
      }));
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
                <MaterialTable columnHeader={columnHeader} data={userRows} />
              </div>
            </div>
          </div>
        </BaseLayout>
      );
};
