import React from 'react';
import { Metadata } from 'next';
import { BalanceSheet } from '../../page/BalanceSheet';

export const metadata: Metadata = {
    title: 'Balance sheet | EFASS',
    description: 'Note to balance sheet',
};

export default function CustomDataPage() {
    return <BalanceSheet />;
}
