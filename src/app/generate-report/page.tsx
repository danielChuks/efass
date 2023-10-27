import React from 'react'
import { Metadata } from 'next'
import { GenerateReport } from '../../page/GenerateReport'

export const metadata: Metadata = {
    title: 'Generate Report | EFASS',
    description: 'Generate Report page for EFASS',
}

export default function GenerateReportPage() {
  return (
    <GenerateReport />
  )
}
