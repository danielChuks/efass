'use client';

import React from 'react';
import BaseLayout from '@/components/BaseLayout';
import { DASHBOARD_PAGES } from "@/enums";
import GlMapingHeader from '../GlMapping/GlMapingHeader';
import CustomDataContent from './CustomDataContent';

export const CustomData = ()=>{
    return (
        <BaseLayout page={DASHBOARD_PAGES.CUSTOM_DATA}>
            <GlMapingHeader/>
            <CustomDataContent/>
        </BaseLayout>
    );
}
