import React from 'react';
import { Metadata } from 'next';
import BaseLayout from '../../components/BaseLayout';
import { HomePage } from '../../page/Home';
import { AuthWrapper } from '../../providers/AuthWrapper';

export const metadata: Metadata = {
    title: 'Dashboard | EFASS',
    description: 'Dashboard page for EFASS',
};

export default function SettingsPage() {
    return (
        // <AuthWrapper>
            <HomePage />
        // </AuthWrapper>
    );
}
