"use client"

import React from 'react'
import DataTable from 'datatables.net-react';
import '@/styles/dataTables.css'
import DT from 'datatables.net-dt';
import 'datatables.net-responsive-dt';
import "datatables.net-buttons-dt";
import "datatables.net-buttons-dt/css/buttons.dataTables.css";
import jszip from 'jszip';
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import SpinnerForTables from '@/components/spinner/spinnerForTables';
import { useContextRegister } from '@/context/contextRegister';
import { TuseDTA } from '@/utils/types/tables';
import { useDTA } from '@/hookss/useDTA';

DataTable.use(DT);
DT.Buttons.jszip(jszip);

interface ITableData {
    useDTAContent: TuseDTA
    title: string
    onOpen: () => void
    tableData: any[] | undefined
    columns: any[]
    setColumnDefs?: { width: string; targets: number; }[]
}

const TableData: React.FC<ITableData> = ({ onOpen, setColumnDefs, title, tableData, columns, useDTAContent }) => {
    const { jsonIsLoading, setContentTable, refreshData } = useContextRegister()
    const { } = useDTA({ tableData, setContentTable, onOpen, useDTAContent })

    return (
        <>
            {(jsonIsLoading == true || tableData == undefined) ?
                <SpinnerForTables /> :
                <DataTable data={tableData} className='order-column text-sm' columns={columns} options={{
                    destroy: true,
                    responsive: true,
                    order: [[0, 'desc']],
                    columnDefs: setColumnDefs,
                    layout: {
                        
                        bottom: {
                            buttons: [
                                {
                                    extend: 'excel',
                                    text: 'Save current page',
                                    filename: `Exportación de ${title}`,
                                    className: 'btn btn-excel-export',
                                    exportOptions: {
                                        modifier: {
                                            page: 'current'
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    language: {
                        url: '../json/dataTableLanguaje.json',
                    },
                }} >
                    <thead>
                        <tr>
                            {columns.map((col, index) => (
                                <th className='truncate' key={index}>{col.data}</th>
                            ))}
                        </tr>
                    </thead>
                </DataTable>
            }
        </>
    )
}

export default TableData