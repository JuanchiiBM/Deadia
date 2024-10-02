"use client"
import React from 'react'
import dynamic from "next/dynamic";

const Chart = dynamic(
  () => import("@/pages/verIngreso/chart/chart").then((mod) => mod.ChartIngresos),
  {
    ssr: false,
  }
);

const VerIngreso = () => {
  return (
    <>
      <h1 className='text-4xl'>Ingresos</h1>
      <Chart/>
    </>
  )
}

export default VerIngreso