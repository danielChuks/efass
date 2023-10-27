"use client";
import { BiSolidDashboard } from 'react-icons/bi';
import { FaClipboardList } from 'react-icons/fa';
import { FaUserCog } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { BiLogIn } from 'react-icons/bi';

import styles from './index.module.scss';
// import { useState } from 'react';
import { DASHBOARD_PAGES } from '../../enums';
import { useRouter } from "next/navigation";
import { SideNavItem } from './SideBarItems';

interface SideNavProps {
    page?: DASHBOARD_PAGES;
}

export default function Sidebar({ page = DASHBOARD_PAGES.HOME }: SideNavProps) {
    const router = useRouter();
    const submit = () => {
          router.push("/dashboard");
      };
    return (
        <div>
            <aside className={styles['sidebar']}>
                <div className={styles['']}>
                    <SideNavItem
                        pageUrl={'/dashboard'}
                        icon={<BiSolidDashboard />}
                        title={'Dashboard'}
                        active={page === DASHBOARD_PAGES.HOME}
                    />

                    <SideNavItem
                        pageUrl={'/generate-report'}
                        icon={<FaClipboardList />}
                        title={'Generate Report'}
                        active={page === DASHBOARD_PAGES.GENERATE_REPORT}
                    />
                    <SideNavItem
                        pageUrl={'/user-management'}
                        icon={<FaUserCog />}
                        title={'User Management'}
                        active={page === DASHBOARD_PAGES.USER_MANAGEMENT}
                    />
                    <div className={styles['sidebar_settings']}>
                    <SideNavItem
                        pageUrl={'/settings'}
                        icon={<FiSettings />}
                        title={'Settings'}
                        active={page === DASHBOARD_PAGES.SETTINGS}
                    />
                    <SideNavItem
                        pageUrl={'/'}
                        icon={<BiLogIn />}
                        title={'Log out'}
                    />
                    </div>
                </div>
            </aside>
        </div>
    );
}
