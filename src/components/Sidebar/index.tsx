'use client';
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
import { useState } from 'react';
import { BsWrenchAdjustableCircleFill } from 'react-icons/bs';

interface SideNavProps {
    page?: DASHBOARD_PAGES;
}

export default function Sidebar({ page = DASHBOARD_PAGES.HOME }: SideNavProps) {
    const [isOpen, setIsOpen] = useState(false);

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
            />

            <SideNavItem
                pageUrl={'/generate-report'}
                icon={<FaClipboardList />}
                title={'Generate Report'}
                active={page === DASHBOARD_PAGES.GENERATE_REPORT}
                open={isOpen}
            />
            <SideNavItem
                pageUrl={'/user-management'}
                icon={<FaUserCog />}
                title={'User Management'}
                active={page === DASHBOARD_PAGES.USER_MANAGEMENT}
                open={isOpen}
            />
            <SideNavItem
                pageUrl={'/gl-mapping'}
                icon={<PiNotebookBold />}
                title={'GL Mapping'}
                active={page === DASHBOARD_PAGES.GL_MAPPING}
                open={isOpen}
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
            />
            <div className={styles['sidebar_settings']}>
                <SideNavItem
                    pageUrl={'/settings'}
                    icon={<FiSettings />}
                    title={'Settings'}
                    active={page === DASHBOARD_PAGES.SETTINGS}
                    open={isOpen}
                />
                <SideNavItem
                    pageUrl={'/login'}
                    icon={<BiLogIn />}
                    title={'Log out'}
                    open={isOpen}
                />
            </div>
        </div>
    );
}
