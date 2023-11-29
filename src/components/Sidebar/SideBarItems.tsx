import classNames from "classnames";
import { useRouter } from "next/navigation";
import { ReactElement } from "react";
import { useSetRecoilState } from 'recoil';
import styles from "./index.module.scss";
import { useAuthActions } from "../../actions/auth";
import { generateReportAtom } from '../../state/generateReport';

interface SideNavItemProps {
    pageUrl: string;
    icon: ReactElement;
    title: string;
    active?: boolean;
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
}: SideNavItemProps) {
   const setReportData = useSetRecoilState(generateReportAtom);
    const router = useRouter();
    const { logout } = useAuthActions();

    const redirect = () => {
        router.push(pageUrl);
        // replace(pageUrl);
    };

    return (
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
    );
}
