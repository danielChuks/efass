'use client';
import React from 'react';
import BaseLayout from '@/components/BaseLayout/index';
import { DASHBOARD_PAGES } from '@/enums';
import GlMapingHeader from '../GlMapping/GlMapingHeader';
import { NoteToPLContent } from './NoteToPLContent';

export const NoteToPL = () => {
    return (
        <BaseLayout page={DASHBOARD_PAGES.NOTETOPL}>
            <GlMapingHeader />
            <NoteToPLContent />
        </BaseLayout>
    );
};

//
