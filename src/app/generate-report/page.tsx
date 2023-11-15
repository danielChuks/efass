import React from 'react';
import { Metadata } from 'next';
import { GenerateReport } from '../../page/GenerateReport';
import { AuthWrapper } from '../../providers/AuthWrapper';

export const metadata: Metadata = {
    title: 'Generate Report | EFASS',
    description: 'Generate Report page for EFASS',
};

export default function GenerateReportPage() {
    return (
        // <AuthWrapper>
            <GenerateReport />
        // </AuthWrapper>
    );
}
