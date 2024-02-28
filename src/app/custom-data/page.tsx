import React from 'react';
import { CustomData } from '@/page/CustomData';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Custom Data | EFASS',
    description: 'Custom Data page for EFASS',
};

export default function CustomDataPage() {
    return <CustomData />;
}
