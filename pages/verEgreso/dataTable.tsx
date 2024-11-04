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
import ReactDOMServer from 'react-dom/server';

DataTable.use(DT);

interface IDataTable extends UseDisclosureProps {
    setContentModal: React.Dispatch<React.SetStateAction<undefined>>
}

interface IRegisters {
    articulo: string,
    categoria: string,
    fecha: string,
    cantidad: string,
    monto: string,

}

const DataTableVerEgreso: React.FC<IDataTable> = ({ onOpen, isOpen, onClose, setContentModal }) => {
    const [tableData, setTableData] = useState<any>()
    const [tableColumns, setTableColumns] = useState([
        { data: 'articulo', title: 'Articulo' },
        { data: 'categoria', title: 'Categoría' },
        { data: 'cantidad', title: 'Cantidad' },
        { data: 'fecha', title: 'Fecha' },
        { data: 'monto', title: 'Monto' },
        { data: 'acciones', title: 'Acciones' }
    ]);

    const initializeDataTable = async () => {
        const jsonData = await GETFunction('incomeRegister') as Array<IRegisters>
        const nextTableData = jsonData.map((dato) => ({
            articulo: dato.articulo,
            categoria: dato.categoria,
            cantidad: dato.cantidad,
            fecha: dato.fecha,
            monto: dato.monto,
            acciones: () => {
                return ReactDOMServer.renderToString(
                    <div id={`actions-${dato.fecha}-${dato.articulo}`} style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                        <button className="edit-btn btn-sigma" id={`edit-btn-${dato.fecha}-${dato.articulo}`}>
                            <FontAwesomeIcon icon={faPenToSquare} className="text-2xl text-default-400" /></button>
                        <button className="delete-btn btn-sigma"> <FontAwesomeIcon icon={faTrashCan} className="text-2xl text-default-400" /> </button>
                    </div>
                );
            }
        }))
        setTableData(nextTableData)
    }

    const hydrateActions = () => {
        Array.from(document.getElementsByClassName('dt-paging-button')).forEach((button) => button.addEventListener('click', () => hydrateActions()))
        Array.from(document.getElementsByClassName('dt-input')).forEach((button) => button.addEventListener('change', () => hydrateActions()))
        if (tableData != undefined) {
            tableData.forEach((dato: any) => {
                document.getElementById(`edit-btn-${dato.aula}-${dato.dni}`)?.addEventListener('click', () => setContentModal(dato))
                if (onOpen)
                    document.getElementById(`edit-btn-${dato.aula}-${dato.dni}`)?.addEventListener('click', () => onOpen())
            })
        }
    }

    useEffect(() => {
        initializeDataTable()
    }, [])

    useEffect(() => {
        hydrateActions()
    }, [tableData])

    return (
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
    )
}

export default DataTableVerEgreso