"use client"

import React, { useEffect, useState } from 'react'
import DataTable from 'datatables.net-react';
import '../../styles/dataTables.css'
import DT from 'datatables.net-dt';
import 'datatables.net-responsive-dt';
import { GETFunction } from '@/utils/globals';

DataTable.use(DT);

interface IRegisters {
    dni: string,
    nombre: string,
    mail: string,
    aula: string,
    curso: string,
    fecha: string,
    monto: string,
    dependencia: string
}

const DataTableRegistrarIngreso = () => {
    const [tableData, setTableData] = useState<any>()
    const [tableColumns, setTableColumns] = useState([
        { data: 'dni', title: 'DNI' },
        { data: 'nombre', title: 'Nombre' },
        { data: 'mail', title: 'Mail' },
        { data: 'aula', title: 'Aula' },
        { data: 'curso', title: 'Curso' },
        { data: 'fecha', title: 'Fecha' },
        { data: 'monto', title: 'Monto' },
        { data: 'dependencia', title: 'Dependencia' },
      ]);

    const initializeDataTable = async () => {
        const jsonData = await GETFunction('incomeRegister') as Array<IRegisters>
        const nextTableData = jsonData.map((dato) => ({
            dni: dato.dni,
            nombre: dato.nombre,
            mail: dato.mail,
            aula: dato.aula,
            curso: dato.curso,
            fecha: dato.fecha,
            monto: dato.monto,
            dependencia: dato.dependencia
        }))
        setTableData(nextTableData)
    }

    useEffect(() => {
        initializeDataTable()
    }, [])
    return (
        <DataTable data={tableData} className='order-column' columns={tableColumns} options={{
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

export default DataTableRegistrarIngreso