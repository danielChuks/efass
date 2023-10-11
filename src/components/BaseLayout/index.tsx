'use client';
import React, { ReactNode } from 'react';
import Sidebar from '../Sidebar';
import styles from './index.module.scss';

interface Props {
    children: ReactNode | ReactNode[];
}

export default function BaseLayout({ children }: Props) {
    return (
        <div className="layout">
            <Sidebar />
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
