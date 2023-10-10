import React from 'react';
import { Metadata } from 'next';
import { UserManagement } from '../../page/UserManagement';

export const metadata: Metadata = {
    title: 'Settings | EFASS',
    description: 'Settings page for EFASS',
}

export default function GenerateReportPage() {
  return (
    <UserManagement />
  )
}
