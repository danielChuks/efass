import { BiSolidDashboard } from 'react-icons/bi';
import Link from 'next/link';
import styles from './index.module.scss';
import { useState } from 'react';

const sidebarItems = [
    {
        name: 'Dashboard',
        href: '/',
        icon: BiSolidDashboard,
    },
    {
        name: 'Generate Report',
        href: '/generate-report',
        icon: BiSolidDashboard,
    },
    {
        name: 'User Management',
        href: '/user-management',
        icon: BiSolidDashboard,
    },

    {
        name: 'Settings',
        href: '/settings',
        icon: BiSolidDashboard,
    },
];

export default function Sidebar() {
    const [activeItem, setActiveItem] = useState('/');
    return (
        <div>
            <aside className={styles['sidebar']}>
                <ul className={styles['sidebarList']}>
                    {sidebarItems.map(({ name, href, icon: Icon }) => (
                        <li className={styles['sidebarItem']} key={name}>
                            <Link href={href} className={styles['sidebaLink']}>
                                <div className={styles['sidebar_icon']}>
                                    <Icon />
                                </div>
                                <span className={styles['sidebarName']}>
                                    {name}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </aside>
        </div>
    );
}
