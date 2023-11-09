import React from "react";
import { GlMapping } from "@/page/GlMapping";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "GL-mapping | EFASS",
	description: "GL-mapping page for EFASS",
};

export default function GlMappingPage() {
	return <GlMapping />;
}
