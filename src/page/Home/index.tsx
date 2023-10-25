"use client";
import Table from "@mui/material/Table";
import BaseLayout from "../../components/BaseLayout";
import styles from "./index.module.scss";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import SearchBar from "../../components/SearchBar";


const rows: GridRowsProp = [
  { id: 1, col1: "1", col2: "Monthly report generated for April, 2023", col3: "21-02-2023  09:10 am", col4: "..." },
  { id: 2, col1: "2", col2: "Monthly report generated for April, 2023", col3: "21-02-2023  09:10 am", col4: "..." },
  { id: 3, col1: "3", col2: "Monthly report generated for April, 2023", col3: "21-02-2023  09:10 am", col4: "..." },
  { id: 4, col1: "4", col2: "Monthly report generated for April, 2023", col3: "21-02-2023  09:10 am", col4: "..." },
  { id: 5, col1: "5", col2: "Monthly report generated for April, 2023", col3: "21-02-2023  09:10 am", col4: "..." },
];

const columns: GridColDef[] = [
  { field: "col1", headerName: "S/N", width: 150, },
  { field: "col2", headerName: "REPORT DETAILS", width: 450 },
  { field: "col3", headerName: "DATE GENERATED", width: 250 },
  { field: "col4", headerName: "ACTION", width: 150 },
];


  
export const HomePage = () => {
  return (
    <BaseLayout>
      <div className={styles.header}>DASHBOARD (Overview)</div>
      <div className={styles["card-body"]}>
        <div className={styles["card-container"]}>
          <h3>User:</h3>
          <p>0</p>
        </div>
        <div className={styles["card-container"]}>
          <h3>Last activity date:</h3>
          <p>0</p>
        </div>
        <div className={styles["card-container"]}>
          <h3>Current Date:</h3>
          <p>0</p>
        </div>
        <div className={styles["card-container"]}>
          <h3>Users Created:</h3>
          <p>0</p>
        </div>
      </div>

      <div className={styles["table_container"]}>
        <div className="table_header">
          <h4 className="title">Recent Activity</h4>
        </div>
        <div className={styles["table_body"]}>
       <SearchBar />
          <div style={{ height: 320, width: "100%", padding: "1rem 0 1rem 0" }}>
            <DataGrid rows={rows} columns={columns} initialState={{
    pagination: {
      paginationModel: { pageSize: 25, page: 0 },
    },
  }}/>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};
