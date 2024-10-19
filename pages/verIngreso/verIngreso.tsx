"use client"
import React, { useState, useEffect, useRef } from 'react';
import dynamic from "next/dynamic";
import ReactDOMServer from 'react-dom/server';
import DataTable from 'datatables.net-react';
import '../../styles/dataTables.css'
import DT from 'datatables.net-dt';
import dayjs from 'dayjs';
import Selects from './selects';
import { DataTableRef } from 'datatables.net-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

DataTable.use(DT);



const Chart = dynamic(
  () => import("@/pages/verIngreso/chart").then((mod) => mod.ChartIngresos
  ),
  {
    ssr: false,
  }
);

let nextTableData: any = [];
let newColumns: any = [];
let jsonData

const VerIngreso = () => {
  const [ajaxUrl, setAjaxUrl] = useState(`http://localhost:3000/deps`); // URL por defecto
  const [tableData, setTableData] = useState();
  const [tableKey, setTableKey] = useState(0);
  const tableRef = useRef<DataTableRef>(null);
  const [columns, setColumns] = useState([
    { data: 'dependencia' },
    { data: 'fecha' },
    { data: 'ingreso' },
    {
      title: 'Acciones',
      data: null,
      render: (data: any, type: any, row: any) => {
        return ReactDOMServer.renderToString(
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <button className="edit-btn btn-sigma">
              <FontAwesomeIcon icon={faPenToSquare} className="text-2xl text-default-400" />
            </button>
            <button className="delete-btn btn-sigma"                 >
              <FontAwesomeIcon icon={faTrashCan} className="text-2xl text-default-400" />
            </button>
          </div>
        );
      }
    }
  ]);


  const selectJson = async (value: string): Promise<any[]> => {
    try {
      const response = await fetch(`http://localhost:3000/${value}`, {
        method: "GET",
      });
      if (value != 'curso')
      setAjaxUrl(`http://localhost:3000/${value}`)
      return response.json();
    } catch (error) {
      console.error("Error:", error);
      return []; // Retorna un string vacío en caso de error
    }
  }

  // Función para actualizar el JSON y las columnas
  const changeJson = async (value: any, ret?: boolean) => {
    // Configura las columnas y URL según el valor seleccionado
    setTableData(undefined)
    switch (value) {
      case '0':
        newColumns = [
          { data: 'dependencia', title: 'Dependencia' },
          { data: 'fecha', title: 'Fecha' },
          { data: 'ingreso', title: 'Ingreso' },
          {
            title: 'Acciones',
            data: null,
            render: (data: any, type: any, row: any) => {
              return ReactDOMServer.renderToString(
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                  <button className="edit-btn btn-sigma">
                    <FontAwesomeIcon icon={faPenToSquare} className="text-2xl text-default-400" />
                  </button>
                  <button className="delete-btn btn-sigma"                 >
                    <FontAwesomeIcon icon={faTrashCan} className="text-2xl text-default-400" />
                  </button>
                </div>
              );
            }
          }
        ];
        jsonData = await selectJson('deps');
        nextTableData = jsonData.map((dato) => ({
          dependencia: dato.dependencia,
          fecha: dato.fecha,
          ingreso: dato.ingreso
        }));
        break;
      case '1':
        newColumns = [
          { data: 'curso', title: 'Curso' },
          { data: 'aula', title: 'Aula' },
          { data: 'fec_inicio', title: 'Fecha de Inicio' },
          { data: 'fec_finalizacion', title: 'Fecha de Finalizacion' },
          { data: 'ingreso', title: 'Ingreso' },
          {
            title: 'Acciones',
            data: null,
            render: (data: any, type: any, row: any) => {
              return ReactDOMServer.renderToString(
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                  <button className="edit-btn btn-sigma">
                    <FontAwesomeIcon icon={faPenToSquare} className="text-2xl text-default-400" />
                  </button>
                  <button className="delete-btn btn-sigma"                 >
                    <FontAwesomeIcon icon={faTrashCan} className="text-2xl text-default-400" />
                  </button>
                </div>
              );
            }
          }
        ];
        jsonData = await selectJson('info');
        nextTableData = jsonData.map((dato) => ({
          curso: dato.curso,
          aula: dato.aula,
          fec_inicio: dato.fec_inicio,
          fec_finalizacion: dato.fec_finalizacion,
          ingreso: dato.ingreso
        }));
        break;
      case '2':
        newColumns = [
          { data: 'curso', title: 'Curso' },
          { data: 'aula', title: 'Aula' },
          { data: 'fec_inicio', title: 'Fecha de Inicio' },
          { data: 'fec_finalizacion', title: 'Fecha de Finalizacion' },
          { data: 'ingreso', title: 'Ingreso' },
          {
            title: 'Acciones',
            data: null,
            render: (data: any, type: any, row: any) => {
              return ReactDOMServer.renderToString(
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                  <button className="edit-btn btn-sigma">
                    <FontAwesomeIcon icon={faPenToSquare} className="text-2xl text-default-400" />
                  </button>
                  <button className="delete-btn btn-sigma"                 >
                    <FontAwesomeIcon icon={faTrashCan} className="text-2xl text-default-400" />
                  </button>
                </div>
              );
            }
          }
        ];
        jsonData = await selectJson('idio');
        nextTableData = jsonData.map((dato) => ({
          curso: dato.curso,
          aula: dato.aula,
          fec_inicio: dato.fec_inicio,
          fec_finalizacion: dato.fec_finalizacion,
          ingreso: dato.ingreso
        }));
        break;
    }
    setTableKey(prevKey => prevKey + 1);
    setColumns(newColumns);
    if (ret = true)
      return nextTableData
  };

  const changeJsonForCurse = async (value: any) => {
    newColumns = [
      { data: 'dni', title: 'DNI' },
      { data: 'nombre', title: 'Nombre' },
      { data: 'mail', title: 'Mail' },
      { data: 'ingreso', title: 'Ingreso' },
      {
        title: 'Acciones',
        data: null,
        render: (data: any, type: any, row: any) => {
          return ReactDOMServer.renderToString(
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
              <button className="edit-btn btn-sigma">
                <FontAwesomeIcon icon={faPenToSquare} className="text-2xl text-default-400" />
              </button>
              <button className="delete-btn btn-sigma"                 >
                <FontAwesomeIcon icon={faTrashCan} className="text-2xl text-default-400" />
              </button>
            </div>
          );
        }
      }
    ];
    setTableData(undefined)
    jsonData = await selectJson('curso');
    nextTableData = jsonData.map((dato) => ({
      dni: dato.dni,
      nombre: dato.nombre,
      mail: dato.mail,
      ingreso: dato.ingreso
    }));
    
    setTableKey(prevKey => prevKey + 1);
    setColumns(newColumns);
  }

  useEffect(() => {
    setTableData((t) => t = nextTableData)
  }, [columns])

  useEffect(() => {
    changeJson('0')
  }, [])

  return (
    <>
      <h1 className='text-4xl'>Ingresos</h1>
      <Chart url={ajaxUrl} />
      <Selects changeJson={changeJson} changeJsonForCurse={changeJsonForCurse} />
      <div className='h-[500px]'>
        <DataTable key={tableKey} ref={tableRef} data={tableData} className='order-column' columns={columns} options={{
          destroy: true,
          language: {
            url: './dataTableLanguaje.json',
          },
        }} >
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th key={index}>{col.data}</th>
              ))}
            </tr>
          </thead>
        </DataTable>
      </div>
    </>
  )
}

export default VerIngreso