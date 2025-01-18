import React from 'react'
import DataTable from 'datatables.net-react';
import '../../../styles/dataTables.css'
import DT from 'datatables.net-dt';
import SpinnerForTables from '@/components/spinnerTables/SpinnerForTables';
import { useDTInscription } from './hooks/useDT';
import { ITableDataDep, ITableDataDeps } from '@/helpers/interfaces';

DataTable.use(DT);

interface ITableVerIngreso {
    tableLoader: boolean
    dateRef: React.MutableRefObject<any>
}

const TableVerIngreso: React.FC<ITableVerIngreso> = ({ tableLoader, dateRef }) => {
    const { tableColumns, tableData, tableKey } = useDTInscription({dateRef})

    return (
        <div className='bg-background-200 rounded-lg'>
            {tableLoader == true ?
                <SpinnerForTables /> :
                <DataTable key={tableKey} columns={tableColumns} data={tableData} className='order-column text-sm' options={{
                    destroy: true,
                    language: {
                        url: '../dataTableLanguaje.json',
                    },
                }} >
                    <thead>
                        <tr>
                            {tableColumns.map((col, index) => (
                                <th key={index}>{col.data}</th>
                            ))}
                        </tr>
                    </thead>
                </DataTable>
            }
        </div>
    )
}

export default TableVerIngreso