import React from "react";
import styles from "./index.module.scss";

interface cardProps {
	title: string;
	content: string;
}

function index({ title, content }: cardProps) {
	return (
		<div className={styles["card-container"]}>
			<h3>{title}:</h3>
			<p>{content}</p>
		</div>
	);
}

export default index;
