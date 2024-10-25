"use client"
import React, { useState, useEffect, useRef } from 'react';
import dynamic from "next/dynamic";
import ReactDOMServer from 'react-dom/server';
import { hydrateRoot } from 'react-dom/client';
import DataTable from 'datatables.net-react';
import '../../styles/dataTables.css'
import DT from 'datatables.net-dt';
import Selects from './selects';
import { DataTableRef } from 'datatables.net-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useDisclosure } from '@nextui-org/react';
import ModalVerIngreso from './modal';

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
  const [contentModal, setContentModal] = useState()
  const dateRef = useRef<any>()
  const tableRef = useRef<DataTableRef>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [columns, setColumns] = useState([
    { data: 'dependencia', title: 'Dependencia' },
    { data: 'fecha', title: 'Fecha' },
    { data: 'ingreso', title: 'Ingreso' },
    { title: 'Acciones', data: null }
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
          { data: 'acciones', title: 'Acciones' }
        ];
        jsonData = await selectJson('deps');
        nextTableData = jsonData.map((dato) => ({
          dependencia: dato.dependencia,
          fecha: dato.fecha,
          ingreso: dato.ingreso,
          id: dato.id,
          acciones: () => {
            return ReactDOMServer.renderToString(
              <div id={`actions-${dato.dependencia}-${dato.id}`} style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                <button className="edit-btn btn-sigma" data-id={dato.id + "-" + dato.dependencia} id={`edit-btn-${dato.dependencia}-${dato.id}`}>
                  <FontAwesomeIcon icon={faPenToSquare} className="text-2xl text-default-400" /></button>
                <button className="delete-btn btn-sigma"> <FontAwesomeIcon icon={faTrashCan} className="text-2xl text-default-400" /> </button>
              </div>
            );
          }
        }));
        break;
      case '1':
        newColumns = [
          { data: 'curso', title: 'Curso' },
          { data: 'aula', title: 'Aula' },
          { data: 'fec_inicio', title: 'Fecha de Inicio' },
          { data: 'fec_finalizacion', title: 'Fecha de Finalizacion' },
          { data: 'ingreso', title: 'Ingreso' },
          { data: 'acciones', title: 'Acciones' }
        ];
        jsonData = await selectJson('info');
        nextTableData = jsonData.map((dato) => ({
          curso: dato.curso,
          aula: dato.aula,
          fec_inicio: dato.fec_inicio,
          fec_finalizacion: dato.fec_finalizacion,
          ingreso: dato.ingreso,
          id: dato.id,
          acciones: () => {
            return ReactDOMServer.renderToString(
              <div id={`actions-${dato.aula}-${dato.id}`} style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                <button className="edit-btn btn-sigma" data-id={dato.id + '-' + dato.aula} id={`edit-btn-${dato.aula}-${dato.id}`}>
                  <FontAwesomeIcon icon={faPenToSquare} className="text-2xl text-default-400" /></button>
                <button className="delete-btn btn-sigma"> <FontAwesomeIcon icon={faTrashCan} className="text-2xl text-default-400" /> </button>
              </div>
            );
          }
        }));
        break;
      case '2':
        newColumns = [
          { data: 'curso', title: 'Curso' },
          { data: 'aula', title: 'Aula' },
          { data: 'fec_inicio', title: 'Fecha de Inicio' },
          { data: 'fec_finalizacion', title: 'Fecha de Finalizacion' },
          { data: 'ingreso', title: 'Ingreso' },
          { data: 'acciones', title: 'Acciones' }
        ];
        jsonData = await selectJson('idio');
        nextTableData = jsonData.map((dato) => ({
          curso: dato.curso,
          aula: dato.aula,
          fec_inicio: dato.fec_inicio,
          fec_finalizacion: dato.fec_finalizacion,
          ingreso: dato.ingreso,
          id: dato.id,
          acciones: () => {
            return ReactDOMServer.renderToString(
              <div id={`actions-${dato.aula}-${dato.id}`} style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                <button className="edit-btn btn-sigma" data-id={dato.id + '-' + dato.aula} id={`edit-btn-${dato.aula}-${dato.id}`}>
                  <FontAwesomeIcon icon={faPenToSquare} className="text-2xl text-default-400" /></button>
                <button className="delete-btn btn-sigma"> <FontAwesomeIcon icon={faTrashCan} className="text-2xl text-default-400" /> </button>
              </div>
            );
          }
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

  const changeDependencyRange = (range: string) => {
    if (nextTableData[0] && nextTableData[0].dependencia) {
      const [minRange, maxRange] = range.split('-');
      const [minMonth, minYear] = minRange.split('/').map(Number);
      const [maxMonth, maxYear] = maxRange.split('/').map(Number);

      const tableFiltered = nextTableData.filter((dato: any) => {
        const [month, year] = dato.fecha.split('/').map(Number);
        if (
          (year > minYear || (year === minYear && month >= minMonth)) &&
          (year < maxYear || (year === maxYear && month <= maxMonth))
        ) {
          return true;
        }
        return false;
      })
      // Agrupar dependencias y sumar los ingresos en un array
      const groupedData: any[] = [];
      let mergedData: any = []

      tableFiltered.forEach((dato: any) => {
        const { dependencia, ingreso } = dato;
        const existingEntry = groupedData.find((item) => item.dependencia === dependencia);

        if (existingEntry) {
          existingEntry.ingreso += parseFloat(ingreso.replace('$', ''));
        } else {
          groupedData.push({
            dependencia,
            ingreso: parseFloat(ingreso.replace('$', '')),
            fecha: `${minRange}-${maxRange}` // Mostrar el rango seleccionado
          });
        }
      });

      // Formatear los ingresos a dos decimales y agregar el símbolo "$"
      mergedData = groupedData.map((item) => ({
        ...item,
        ingreso: `$${item.ingreso}`,
        acciones: null
      }));

      setTableData(mergedData); // Actualizar la tabla con los datos agrupados
    }
  }

  const changeRange = () => {
    const datePicked = dateRef.current?.innerText.split('\n').filter((date: string) => {
      return date != '/'
    }).filter((date: string, index: number) => {
      if (index != 0 && index != 4) {
        return date
      }
    }).map((date: string, index: number) => {
      let newDate
      if (index == 0 || index == 3) {
        newDate = `${date}/`
        return newDate
      } else {
        return date
      }
    }).join('')

    changeDependencyRange(datePicked)
  }

  const hydrateActions = () => {
    Array.from(document.getElementsByClassName('dt-paging-button')).forEach((button) => button.addEventListener('click', () => hydrateActions()))
    Array.from(document.getElementsByClassName('dt-input')).forEach((button) => button.addEventListener('change', () => hydrateActions()))
    nextTableData.forEach((dato: any) => {
      if (document.getElementById(`actions-${dato.dependencia}-${dato.id}`)) {
        document.getElementById(`edit-btn-${dato.dependencia}-${dato.id}`)?.addEventListener('click', () => setContentModal(dato))
        document.getElementById(`edit-btn-${dato.dependencia}-${dato.id}`)?.addEventListener('click', () => onOpen())
      } else if (document.getElementById(`actions-${dato.aula}-${dato.id}`)) {
        document.getElementById(`edit-btn-${dato.aula}-${dato.id}`)?.addEventListener('click', () => setContentModal(dato))
        document.getElementById(`edit-btn-${dato.aula}-${dato.id}`)?.addEventListener('click', () => onOpen())
      }
    })
  }

  useEffect(() => {
    hydrateActions()
  }, [tableData])

  useEffect(() => {
    setTableData((t) => t = nextTableData)
    changeRange()
  }, [columns])

  useEffect(() => {
    changeJson('0')
  }, [])

  return (
    <>
      <h1 className='text-4xl'>Ingresos</h1>
      <Chart url={ajaxUrl} />
      <Selects changeJson={changeJson} changeJsonForCurse={changeJsonForCurse} changeRange={changeRange} dateRef={dateRef} />
      <div className='h-[500px]'>
        <DataTable key={tableKey} ref={tableRef} data={tableData} className='order-column' columns={columns} options={{
          destroy: true,
          responsive: true,
          language: {
            url: '../dataTableLanguaje.json',
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
      <ModalVerIngreso isOpen={isOpen} onClose={onClose} onOpen={onOpen} contentModal={contentModal} />
    </>
  )
}

export default VerIngreso