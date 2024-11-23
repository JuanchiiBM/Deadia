import React from 'react'
import DataTable from 'datatables.net-react';
import '../../../styles/dataTables.css'
import DT from 'datatables.net-dt';
import SpinnerForTables from '@/components/spinnerTables/SpinnerForTables';
import { useDTInscription } from '@/hooks/inscripciones/verInscripcion/useDT';
import { ITableDataDep, ITableDataDeps } from '@/helpers/interfaces';

DataTable.use(DT);

interface ITableVerIngreso {
    tableLoader: boolean
    dateRef: React.MutableRefObject<any>
}

const TableVerIngreso: React.FC<ITableVerIngreso> = ({ tableLoader, dateRef }) => {
    const { tableData, columnsData } = useDTInscription({dateRef})

    return (
        <div className='bg-background-200 rounded-lg'>
            {tableLoader == true ?
                <SpinnerForTables /> :
                <DataTable data={tableData} className='order-column text-sm' columns={columnsData} options={{
                    destroy: true,
                    responsive: true,
                    language: {
                        url: '../dataTableLanguaje.json',
                    },
                }} >
                    <thead>
                        <tr>
                            {columnsData.map((col, index) => (
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