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

interface SideNavProps {
    page?: DASHBOARD_PAGES;
}

export default function Sidebar({ page = DASHBOARD_PAGES.HOME }: SideNavProps) {
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
                    <SideNavItem
                        pageUrl={'/gl-mapping'}
                        icon={<PiNotebookBold />}
                        title={'GL Mapping'}
                        active={page === DASHBOARD_PAGES.GL_MAPPING}
                    />
                    <SideNavItem
                        pageUrl={'/custom-data'}
                        icon={<MdOutlineDashboardCustomize />}
                        title={'Custom Data'}
                        active={page === DASHBOARD_PAGES.CUSTOM_DATA}
                    />
                    <div className={styles['sidebar_settings']}>
                        <SideNavItem
                            pageUrl={'/settings'}
                            icon={<FiSettings />}
                            title={'Settings'}
                            active={page === DASHBOARD_PAGES.SETTINGS}
                        />
                        <SideNavItem
                            pageUrl={'/login'}
                            icon={<BiLogIn />}
                            title={'Log out'}
                        />
                    </div>
                </div>
            </aside>
        </div>
    );
}
