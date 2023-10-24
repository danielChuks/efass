import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { ReactElement, useState } from 'react';

import styles from './index.module.scss';

interface SideNavItemProps {
    pageUrl: string;
    icon: ReactElement;
    title: string;
    active: boolean;
}

export function SideNavItem({
    pageUrl,
    icon,
    title,
    active,
}: SideNavItemProps) {
    const { replace } = useRouter();

    const redirect = () => {
        replace(pageUrl);
    };

    return (
        <div
            className={classNames(
                styles['side-nav-item'],
                active ? styles['active'] : ''
            )}
            onClick={redirect}
        >
            {icon}
            <p>{title}</p>
        </div>
    );
}
