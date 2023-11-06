'use client';
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

export default function ContentSection() {
    const {
        ['report-id']: reportId,
    } = useParams();
    const searchParams = useSearchParams();
    const selectedDate = searchParams.get('selectedDate');

    useEffect(() => {
        console.log(reportId);
        console.log(selectedDate)
    }, [reportId, selectedDate]);

    return <div>ContentSection</div>;
}
