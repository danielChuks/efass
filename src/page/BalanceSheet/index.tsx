'use client';
import React from 'react';
import BaseLayout from '@/components/BaseLayout/index';
import { DASHBOARD_PAGES } from '@/enums';
import GlMapingHeader from '../GlMapping/GlMapingHeader';
import BalanceSheetContent from './BalanceSheetContent';

export const BalanceSheet = () => {
    return (
        <BaseLayout page={DASHBOARD_PAGES.BALANCE_SHEET}>
            <GlMapingHeader />
            <BalanceSheetContent />
        </BaseLayout>
    );
};

