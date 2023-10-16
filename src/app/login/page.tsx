import React from 'react';
import { Metadata } from 'next';
import { Login } from '@/page/Login/index';

export const metadata: Metadata = {
    title: 'Login | EFASS',
    description: 'Login page for EFASS',
}

export default function LoginPage() {
  return (
    <Login />
  )
}
