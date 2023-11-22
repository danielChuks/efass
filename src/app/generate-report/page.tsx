import React from 'react';
import { GenerateReport } from '../../page/GenerateReport';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Generate Report  | EFASS',
    description: 'Generate Report page for EFASS',
};

export default function GenerateReportPage() {
    return <GenerateReport />;
}
