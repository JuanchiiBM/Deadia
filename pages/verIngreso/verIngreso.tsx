"use client"
import React, { useState } from 'react';
import dynamic from "next/dynamic";
import DataTable from 'datatables.net-react';
import '../../styles/dataTables.css'
import DT from 'datatables.net-dt';
import json from '@/public/data.json'
import Selects from './parts/selects';
import { useTheme } from 'next-themes';

DataTable.use(DT);


const Chart = dynamic(
  () => import("@/pages/verIngreso/parts/chart").then((mod) => mod.ChartIngresos
  ),
  {
    ssr: false,
  }
);

const VerIngreso = () => {
  const [columns, setColumns] = useState([
    { data: 'Dependencia' },
    { data: 'Fecha' },
    { data: 'Ingreso' },
  ]);
  const [ajaxUrl, setAjaxUrl] = useState('/data.json'); // URL por defecto
  const [tableKey, setTableKey] = useState(Date.now());

  // Función para actualizar el JSON y las columnas
  const changeJson = (value: any) => {
    // Configura las columnas y URL según el valor seleccionado
    if (value === '0') {
      setColumns([
        { data: 'Dependencia' },
        { data: 'Fecha' },
        { data: 'Ingreso' },
      ]);
      setAjaxUrl('/data.json');
    } else if (value === '1') {
      setColumns([
        { data: 'curso' },
        { data: 'aula' },
        { data: 'fec_inicio' },
        { data: 'fec_finalizacion' },
        { data: 'ingreso' },
      ]);
      setAjaxUrl('/informatica.json');
    } else if (value === '2') {
      setColumns([
        { data: 'curso' },
        { data: 'aula' },
        { data: 'fec_inicio' },
        { data: 'fec_finalizacion' },
        { data: 'ingreso' },
      ]);
      setAjaxUrl('/idiomas.json');
    }
    setTableKey(Date.now());
  };


  // Procesar los datos para crear las series de ApexCharts
  const sortedData = json.data.sort((a, b) => {
    const [monthA, yearA] = a.Fecha.split("/").map(Number);
    const [monthB, yearB] = b.Fecha.split("/").map(Number);
    return yearA !== yearB ? yearA - yearB : monthA - monthB;
  });

  const minFecha = sortedData[0].Fecha;
  const maxFecha = sortedData[sortedData.length - 1].Fecha;
  // Crear las series para cada dependencia
  const series = ["Informática", "Idiomas"].map((dependencia) => ({
    name: dependencia,
    data: sortedData
      .filter((item) => item.Dependencia === dependencia)
      .map((item) => Number(item.Ingreso.replace("$", "")))
  }));



  return (
    <>
      <h1 className='text-4xl'>Ingresos</h1>
      <Chart series={series} minFecha={minFecha} maxFecha={maxFecha} />
      <Selects changeJson={changeJson} />
      <DataTable key={tableKey} ajax={ajaxUrl} className='order-column' columns={columns} options={{
        destroy: true,
        language: {
          url: './dataTableLanguaje.json'
        }
      }} >
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.data.charAt(0).toUpperCase() + col.data.slice(1)}</th>
            ))}
          </tr>
        </thead>
      </DataTable>
    </>
  )
}

export default VerIngreso