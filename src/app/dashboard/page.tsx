import '../../index.css'

import React from 'react'
// import dynamic from 'next/dynamic'
import Dashboard from 'src/pages/Dashboard'
 
// const Dashboard = dynamic(() => import('src/pages/Dashboard'), { ssr: false })

export default function Page() {
    return <Dashboard />
  }