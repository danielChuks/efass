"use client";

import React from "react";
import styles from "./index.module.scss";
import { useRouter } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { getCurrentDateAndTime } from "../GenerateReport/utils";

function GlMapingHeader() {
	const router = useRouter();
	return (
        <div className={styles['header']}>
            <div onClick={router.back} className={styles['back']}>
                <AiOutlineArrowLeft size={24} />
                <p>Go Back</p>
            </div>

            <div className={styles['date_container']}>
                <p className={styles['title']}>Current Date:</p>
                <p className={styles['date']}>{getCurrentDateAndTime()}</p>
            </div>
        </div>
    );
}

export default GlMapingHeader;
