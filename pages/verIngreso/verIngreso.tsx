"use client"
import React from 'react'
import dynamic from "next/dynamic";
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import '../../styles/dataTables.css'

DataTable.use(DT);

const Chart = dynamic(
  () => import("@/pages/verIngreso/chart/chart").then((mod) => mod.ChartIngresos),
  {
    ssr: false,
  }
);

const VerIngreso = () => {
  const [tableData, setTableData] = React.useState([
    ['Tiger Nixon', 'System Architect'],
    ['Garrett Winters', 'Accountant'],
    ['Tiger Nixon', 'System Architect'],
    ['Garrett Winters', 'Accountant'],
    ['Tiger Nixon', 'System Architect'],
    ['Garrett Winters', 'Accountant'],
    ['Tiger Nixon', 'System Architect'],
    ['Garrett Winters', 'Accountant'],
    ['Tiger Nixon', 'System Architect'],
    ['Garrett Winters', 'Accountant'],
    ['Tiger Nixon', 'System Architect'],
    ['Garrett Winters', 'Accountant'],
    ['Tiger Nixon', 'System Architect'],
    ['Garrett Winters', 'Accountant'],
    ['Tiger Nixon', 'System Architect'],
    ['Garrett Winters', 'Accountant'],
    ['Tiger Nixon', 'System Architect'],
    ['Garrett Winters', 'Accountant'],
    ['Tiger Nixon', 'System Architect'],
    ['Garrett Winters', 'Accountant'],
    ['Tiger Nixon', 'System Architect'],
    ['Garrett Winters', 'Accountant'],
    ['Tiger Nixon', 'System Architect'],
    ['Garrett Winters', 'Accountant'],
    ['Tiger Nixon', 'System Architect'],
    ['Garrett Winters', 'Accountant'],
    ['Tiger Nixon', 'System Architect'],
    ['Garrett Winters', 'Accountant'],
    ['Tiger Nixon', 'System Architect'],
    ['Garrett Winters', 'Accountant'],

    // ...
  ]);

  return (
    <>
      <h1 className='text-4xl'>Ingresos</h1>
      <Chart />
      <div></div>
      <DataTable data={tableData} className='display' options={{
        destroy: true,
        language: {
          //url: '/dataTableLanguaje.json',
        },
         
      }} >
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
          </tr>
        </thead>
      </DataTable>
    </>
  )
}

export default VerIngreso