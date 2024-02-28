'use client';

import React, { useState } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { ReactElement } from 'react';
import { useSetRecoilState } from 'recoil';
import styles from './index.module.scss';
import { useAuthActions } from '../../actions/auth';
import { generateReportAtom } from '../../state/generateReport';
import SnackbarComponent from '../Snackbar';

interface SideNavItemProps {
    pageUrl: string;
    icon: ReactElement;
    title: string;
    active?: boolean;
    isPageActive?: boolean;
    signout?: boolean;
    open?: boolean;
}

export function SideNavItem({
    pageUrl,
    icon,
    title,
    active,
    signout = false,
    open = true,
    isPageActive,
}: SideNavItemProps) {
    const setReportData = useSetRecoilState(generateReportAtom);
    const router = useRouter();
    const { logout } = useAuthActions();
    const [isopen, setIsOpen] = useState(false);
    const [SnackbarMessage, setSnackbarMessage] = useState<string>('');

    const redirect = () => {
        if (!isPageActive) {
            setIsOpen(true);
            setSnackbarMessage(
                'To proceed, please update your default password. Once completed, you will have access to this page'
            );
            return;
        }
        router.push(pageUrl);
        // replace(pageUrl);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            <SnackbarComponent
                handleClose={handleClose}
                isopen={isopen}
                message={SnackbarMessage}
            />
            <div
                className={classNames(
                    styles['side-nav-item'],
                    active ? styles['active'] : ''
                )}
                onClick={signout ? logout : redirect}
            >
                {icon}
                {open && <p>{title}</p>}
            </div>
        </>
    );
}
