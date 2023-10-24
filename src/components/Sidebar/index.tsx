"use client";
import { BiSolidDashboard } from 'react-icons/bi';
import styles from './index.module.scss';
// import { useState } from 'react';
import { DASHBOARD_PAGES } from '../../enums';
import { useRouter } from "next/navigation";
import { SideNavItem } from './SideBarItems';

interface SideNavProps {
    page?: DASHBOARD_PAGES;
}

export default function Sidebar({ page = DASHBOARD_PAGES.HOME }: SideNavProps) {
    // const router = useRouter();

    return (
        <div>
            <aside className={styles['sidebar']}>
                <div className={styles['items']}>
                    <SideNavItem
                        pageUrl={'/'}
                        icon={<BiSolidDashboard />}
                        title={'Dashboard'}
                        active={page === DASHBOARD_PAGES.HOME}
                    />

                    <SideNavItem
                        pageUrl={'/generate-report'}
                        icon={<BiSolidDashboard />}
                        title={'Generate Report'}
                        active={page === DASHBOARD_PAGES.GENERATE_REPORT}
                    />
                    <SideNavItem
                        pageUrl={'/user-management'}
                        icon={<BiSolidDashboard />}
                        title={'User Management'}
                        active={page === DASHBOARD_PAGES.USER_MANAGEMENT}
                    />
                    <SideNavItem
                        pageUrl={'/settings'}
                        icon={<BiSolidDashboard />}
                        title={'Settings'}
                        active={page === DASHBOARD_PAGES.SETTINGS}
                    />
                </div>
            </aside>
        </div>
    );
}
