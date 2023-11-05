import React from 'react'
import { Metadata } from 'next'
import { DynamicReports } from '@/page/GenerateReport/DynamicReports'

export const metadata: Metadata = {
    title: 'Generate Report | EFASS',
    description: 'Generate Report page for EFASS',
}

export default function GenerateReportPage() {
  return (
    <DynamicReports />
  )
}
