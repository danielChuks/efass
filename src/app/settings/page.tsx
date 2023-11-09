import React from 'react';
import { Settings } from '../../page/Settings';
import { Metadata } from 'next';
import { AuthWrapper } from '../../providers/AuthWrapper';

export const metadata: Metadata = {
    title: 'Settings | EFASS',
    description: 'Settings page for EFASS',
};

export default function SettingsPage() {
    return (
        <AuthWrapper>
            <Settings />
        </AuthWrapper>
    );
}
