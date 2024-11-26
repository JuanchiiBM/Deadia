import React from 'react'
import DataTable from 'datatables.net-react';
import '../../../styles/dataTables.css'
import DT from 'datatables.net-dt';
import SpinnerForTables from '@/components/spinnerTables/SpinnerForTables';
import { useDT } from '@/hooks/egresos/verEgreso/useDT';

DataTable.use(DT);

interface ITable {
    tableLoader: boolean
    dateRef: React.MutableRefObject<any>
}

const Table: React.FC<ITable> = ({ tableLoader, dateRef }) => {
    const { tableColumns, tableData, tableKey } = useDT({dateRef})

    return (
        <div className='bg-background-200 rounded-lg'>
            {tableLoader == true ?
                <SpinnerForTables /> :
                <DataTable key={tableKey} columns={tableColumns} data={tableData} className='order-column text-sm' options={{
                    destroy: true,
                    responsive: true,
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

export default Table