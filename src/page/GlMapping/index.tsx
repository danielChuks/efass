"use client";

import React from "react";
import BaseLayout from "@/components/BaseLayout";
import { DASHBOARD_PAGES } from "@/enums";
import GlMapingHeader from "./GlMapingHeader";
import GlMappingContent from "./GlMappingContent";
import styles from "./index.module.scss";

export const GlMapping = () => {
	return (
		<BaseLayout page={DASHBOARD_PAGES.GL_MAPPING}>
			<GlMapingHeader />
            <GlMappingContent/>
		</BaseLayout>
	);
};
