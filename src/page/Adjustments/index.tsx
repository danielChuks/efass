'use client';
import React from 'react';
import BaseLayout from '@/components/BaseLayout/index';
import { DASHBOARD_PAGES } from '@/enums';
import GlMapingHeader from '../GlMapping/GlMapingHeader';
import {AdjustmentContent} from './AdjustmentContent';

export const Adjustments = () => {
    return (
        <BaseLayout page={DASHBOARD_PAGES.ADJUSTMENTS}>
            <GlMapingHeader />
            <AdjustmentContent />
        </BaseLayout>
    );
};
//
