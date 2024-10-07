"use client"
import React from 'react'
import dynamic from "next/dynamic";
import DataTable from 'datatables.net-react';
import '../../styles/dataTables.css'
import DT from 'datatables.net-dt';


DataTable.use(DT);

const Chart = dynamic(
  () => import("@/pages/verIngreso/chart/chart").then((mod) => mod.ChartIngresos),
  {
    ssr: false,
  }
);

const VerIngreso = () => {

  const columns = [
    { data: 'name' },
    { data: 'position' },
    { data: 'office' },
    { data: 'extn' },
    { data: 'start_date' },
    { data: 'salary' },
  ]

  return (
    <>
      <h1 className='text-4xl'>Ingresos</h1>
      <Chart />
      <div className='w-full my-[50px] bg-background-200 flex justify-around p-5 rounded-lg shadow-md'>
        <div className='flex flex-col'>
          <label htmlFor="select-dependency">Dependencia:</label>
          <select name="" id="select-dependency" className='w-[170px] rounded-md bg-background'>
            <option value="0">1</option>
            <option value="1">2</option>
          </select>
        </div>
        <div className='flex flex-col'>
          <label htmlFor="select-curso">Curso:</label>
          <select name="" id="select-curso" className='w-[170px] rounded-md bg-background'>
            <option value="0">1</option>
            <option value="1">2</option>
          </select>
        </div>
      </div>
      
      <DataTable ajax="/data.json" className='display' columns={columns} options={{
        destroy: true,
        language: {
          //url: '/dataTableLanguaje.json',
        },
      }} >
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Office</th>
            <th>Extn.</th>
            <th>Start date</th>
            <th>Salary</th>
          </tr>
        </thead>
      </DataTable>
    </>
  )
}

export default VerIngreso