import classNames from "classnames";
import { useRouter } from "next/navigation";
import { ReactElement } from "react";
import Link from "next/link";

import styles from "./index.module.scss";
import { useAuthActions } from "../../actions/auth";

interface SideNavItemProps {
	pageUrl: string;
	icon: ReactElement;
	title: string;
	active?: boolean;
	signout?: boolean;
}

export function SideNavItem({
	pageUrl,
	icon,
	title,
	active,
	signout = false,
}: SideNavItemProps) {
	const router = useRouter();
	const { logout } = useAuthActions();

	const redirect = () => {
		router.push(pageUrl);
		// replace(pageUrl);
	};

	return (
		<div
			className={classNames(
				styles["side-nav-item"],
				active ? styles["active"] : ""
			)}
			onClick={signout ? logout : redirect}
		>
			{icon}
			<p>{title}</p>
		</div>
	);
}
