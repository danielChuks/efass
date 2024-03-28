'use client';
import React, { useEffect, useState } from 'react';
import { BiSolidDashboard } from 'react-icons/bi';
import { FaClipboardList } from 'react-icons/fa';
import { FaUserCog } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { BiLogIn } from 'react-icons/bi';
import { PiNotebookBold } from 'react-icons/pi';
import { MdOutlineDashboardCustomize } from 'react-icons/md';
import styles from './index.module.scss';
import { DASHBOARD_PAGES } from '../../enums';
import { SideNavItem } from './SideBarItems';
import { HamburgerIcon } from '@/assets/HamburgerIcon';
import { BsWrenchAdjustableCircleFill } from 'react-icons/bs';
import { LuSheet } from 'react-icons/lu';
import { PiNoteFill } from 'react-icons/pi';
import { checkUser } from '../../utils';
import { Router } from 'next/router';
import { useRouter } from 'next/navigation';

interface SideNavProps {
    page?: DASHBOARD_PAGES;
}

export default function Sidebar({ page = DASHBOARD_PAGES.HOME }: SideNavProps) {
    const [isOpen, setIsOpen] = useState(false);
    // const [pageStatus, setPageStatus] = useState({ isPageActive: false });
    //if user logs in for the first time, the page becomes inactive till user updates password
    //page status is stored in session storage determine status of the application.

    // useEffect(() => {
    //     // Use useEffect to fetch session storage data after component mounts
    //     if (typeof window !== 'undefined') {
    //         const storedData = JSON.parse(
    //             sessionStorage?.getItem('isPageActive') || '{}'
    //         );
    //         setPageStatus(storedData);
    //     }
    // }, []);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div
            className={styles['sidebar']}
            style={{
                width: isOpen ? 220 : 77,
                minWidth: isOpen ? 220 : 77,
                maxWidth: isOpen ? 220 : 77,
            }}
        >
            <div className={styles['hamburger']} onClick={toggle}>
                <HamburgerIcon />
            </div>
            <SideNavItem
                pageUrl={'/dashboard'}
                icon={<BiSolidDashboard />}
                title={'Dashboard'}
                active={page === DASHBOARD_PAGES.HOME}
                open={isOpen}
                // isPageActive={pageStatus.isPageActive}
            />

            <SideNavItem
                pageUrl={'/generate-report'}
                icon={<FaClipboardList />}
                title={'Generate Report'}
                active={page === DASHBOARD_PAGES.GENERATE_REPORT}
                open={isOpen}
                // isPageActive={pageStatus.isPageActive}
            />
            <SideNavItem
                pageUrl={'/gl-mapping'}
                icon={<PiNotebookBold />}
                title={'GL Mapping'}
                active={page === DASHBOARD_PAGES.GL_MAPPING}
                open={isOpen}
                // isPageActive={pageStatus.isPageActive}
            />
            {/* <SideNavItem
                pageUrl={'/custom-data'}
                icon={<MdOutlineDashboardCustomize />}
                title={'Custom Data'}
                active={page === DASHBOARD_PAGES.CUSTOM_DATA}
                open={isOpen}
            /> */}
            <SideNavItem
                pageUrl={'/adjustments'}
                icon={<BsWrenchAdjustableCircleFill />}
                title={'Adjustments'}
                active={page === DASHBOARD_PAGES.ADJUSTMENTS}
                open={isOpen}
                // isPageActive={pageStatus.isPageActive}
            />
            <SideNavItem
                pageUrl={'/balance-sheet'}
                icon={<LuSheet />}
                title={'General Ledger Balances'}
                active={page === DASHBOARD_PAGES.BALANCE_SHEET}
                open={isOpen}
                // isPageActive={pageStatus.isPageActive}
            />
            {/* <SideNavItem
                pageUrl={'/notetopl'}
                icon={<PiNoteFill />}
                title={'Note to P & L'}
                active={page === DASHBOARD_PAGES.NOTETOPL}
                open={isOpen}
            /> */}
            <div className={styles['sidebar_settings']}>
                {/* {checkUser().role === 'ROLE_ADMIN' ? ( */}
                    <SideNavItem
                        pageUrl={'/user-management'}
                        icon={<FaUserCog />}
                        title={'User Management'}
                        active={page === DASHBOARD_PAGES.USER_MANAGEMENT}
                        open={isOpen}
                        // isPageActive={pageStatus.isPageActive}
                    />
                {/* ) : null} */}

                {/* <SideNavItem
                    pageUrl={'/settings'}
                    icon={<FiSettings />}
                    title={'Settings'}
                    active={page === DASHBOARD_PAGES.SETTINGS}
                    open={isOpen}
                    // isPageActive={pageStatus.isPageActive}
                /> */}

                <SideNavItem
                    pageUrl={'/login'}
                    icon={<BiLogIn />}
                    title={'Log out'}
                    open={isOpen}
                    signout={true}
                />
            </div>
        </div>
    );
}
