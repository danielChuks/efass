"use client";
import * as React from 'react';
import BaseLayout from "../../components/BaseLayout";
import styles from "./index.module.scss";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import SearchBar from "../../components/SearchBar";
import { DASHBOARD_PAGES } from "../../enums";
import Filter from "../../components/FilterBy";
import { useEffect, useState } from "react";
import {MaterialTable} from '../../components/MaterialTable';


const columnHeader = [
      { id: "1", label: "S/NO", minWidth: 170 },
      { id: "2", label: "Report details", minWidth: 170, },
      { id: "3", label: "Date generated", minWidth: 170 },
      { id: "4", label: "ACTION", minWidth: 100 },
]


export const HomePage = () => {
    const [currentDate, setCurrentDate]= useState(new Date());

    useEffect(() => {
        const fetchCurrentDate = () => {
          const now = new Date();
          setCurrentDate(now);
        };
    
        fetchCurrentDate();
    }, [])
    const formattedCurrentDate = currentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

  return (
    <BaseLayout page={DASHBOARD_PAGES.HOME}>
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
          <p>{formattedCurrentDate}</p>
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
        <div className={styles['contentTopSection']}>
                <SearchBar />
                <Filter />
            </div>
          <div style={{ height: 320, width: "100%", padding: "1rem 0 1rem 0" }}>
            <MaterialTable columnHeader={columnHeader}/>
     
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};
