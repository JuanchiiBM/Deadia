import React from 'react'
import DataTable from 'datatables.net-react';
import '../../styles/dataTables.css'
import DT from 'datatables.net-dt';
import { Spinner } from '@nextui-org/react';
import SpinnerForTables from '@/components/spinnerTables/SpinnerForTables';

DataTable.use(DT);

interface ITableVerEgreso {
    tableKey: React.Key | null | undefined
    tableRef: any
    tableLoader: boolean
    tableData: any[]
    columns: any[]
}

const TableVerEgreso: React.FC<ITableVerEgreso> = ({ tableKey, tableRef, tableData, columns, tableLoader }) => {

    return (
        <div className='h-[500px] 'background-200 rounded-lg'>
            {tableLoader == true ?
                <SpinnerForTables /> :
                <DataTable key={tableKey} ref={tableRef} data={tableData} className='order-column text-sm' columns={columns} options={{
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
            }

        </div>
    )
}

export default TableVerEgreso