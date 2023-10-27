'use client';
import React, { ReactNode } from 'react';
import Sidebar from '../Sidebar';
import styles from './index.module.scss';
import { DASHBOARD_PAGES } from '../../enums';

interface Props {
    children?: ReactNode
    page?: DASHBOARD_PAGES;
}

export default function BaseLayout({ children, page }: Props) {
    return (
        <div className="layout">
            <Sidebar page={page}/>
            <div className="content">
                <div className={styles['navbar']}>
                    Electronic Financial Analysis and Surveillance System
                    (eFASS)
                </div>
                <div className={styles.main}>{children}</div>
            </div>
        </div>
    );
}
