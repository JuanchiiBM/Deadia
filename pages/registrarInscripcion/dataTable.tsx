"use client"

import React, { useEffect, useState } from 'react'
import DataTable from 'datatables.net-react';
import '../../styles/dataTables.css'
import DT from 'datatables.net-dt';
import 'datatables.net-responsive-dt';
import { GETFunction } from '@/utils/globals';
import { UseDisclosureProps } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import SpinnerForTables from '@/components/spinnerTables/SpinnerForTables';
import ReactDOMServer from 'react-dom/server';

DataTable.use(DT);

interface IDataTable extends UseDisclosureProps {
    setContentModal: React.Dispatch<React.SetStateAction<undefined>>
    dateSelected: any[] | undefined
    setTableLoader: React.Dispatch<React.SetStateAction<boolean>>
    tableLoader: boolean
}

export interface IRegisters {
    list: [
        {
            aula: string
            curso: string
            dependencia: string
            dni_alumno: string
            fec_compra: string
            id: number
            mail: string
            monto: number
            nom_alumno: string
            usuario: string
        }
    ]
}

let nextTableData: any

const DataTableRegistrarIngreso: React.FC<IDataTable> = ({ onOpen, isOpen, onClose, setContentModal, dateSelected, setTableLoader, tableLoader }) => {
    const [tableData, setTableData] = useState<any>(undefined)
    const [tableColumns, setTableColumns] = useState([
        { data: 'dni', title: 'DNI' },
        { data: 'nombre', title: 'Nombre' },
        { data: 'categoria', title: 'Categoría' },
        { data: 'dependencia', title: 'Dependencia' },
        { data: 'curso', title: 'Curso' },
        { data: 'aula', title: 'Aula' },
        { data: 'fecha', title: 'Fecha' },
        { data: 'monto', title: 'Monto' },
        { data: 'acciones', title: 'Acciones' }
    ]);

    const initializeDataTable = async () => {
        if (dateSelected) {
            setTableLoader(true)
            const jsonData = await GETFunction(`api/income/register?start_date=${dateSelected[0]}&end_date=${dateSelected[1]}`, setTableLoader) as IRegisters
            nextTableData = jsonData.list.map((dato) => ({
                id: dato.id,
                usuario: dato.usuario,
                dni: dato.dni_alumno,
                grado: dato.dni_alumno,
                nombre: dato.nom_alumno,
                mail: dato.mail,
                categoria: dato.dni_alumno, //dato.categoria == 'Militar' ? `${dato.categoria} (${dato.grado})` : `${dato.categoria}`,
                categoriaSinGrado: dato.dni_alumno,
                dependencia: dato.dependencia,
                curso: dato.curso,
                aula: dato.aula,
                fecha: dato.fec_compra,
                monto: dato.monto,
                acciones: () => {
                    return ReactDOMServer.renderToString(
                        <div id={`actions-${dato.id}`} style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                            <button className="edit-btn btn-sigma" id={`edit-btn-${dato.id}`}>
                                <FontAwesomeIcon icon={faPenToSquare} className="text-2xl text-default-400" /></button>
                            <button className="delete-btn btn-sigma"> <FontAwesomeIcon icon={faTrashCan} className="text-2xl text-default-400" /> </button>
                        </div>
                    );
                }
            }))
            setTimeout(() => {
                setTableData(nextTableData)
            }, 100)
        }
    }

    const hydrateActions = () => {
        Array.from(document.getElementsByClassName('dt-paging-button')).forEach((button) => button.addEventListener('click', () => hydrateActions()))
        Array.from(document.getElementsByClassName('dt-input')).forEach((button) => button.addEventListener('change', () => hydrateActions()))
        if (tableData != undefined) {
            tableData.forEach((dato: any) => {
                document.getElementById(`edit-btn-${dato.id}`)?.addEventListener('click', () => setContentModal(dato))
                if (onOpen)
                    document.getElementById(`edit-btn-${dato.id}`)?.addEventListener('click', () => onOpen())
            })
        }
    }

    useEffect(() => {
        if (dateSelected) {
            initializeDataTable()
        }
    }, [dateSelected])

    useEffect(() => {
        if (dateSelected) {
            hydrateActions()
        }
    }, [tableData])

    return (
        <div>
            {tableLoader == true ?
                <SpinnerForTables /> :
                <DataTable data={tableData} className='order-column text-sm' columns={tableColumns} options={{
                    destroy: true,
                    responsive: true,
                    language: {
                        url: '../dataTableLanguaje.json',
                    },
                }} >
                    <thead>
                        <tr>
                            {tableColumns.map((col, index) => (
                                <th className='truncate' key={index}>{col.data}</th>
                            ))}
                        </tr>
                    </thead>
                </DataTable>
            }
        </div>
    )
}

export default DataTableRegistrarIngreso