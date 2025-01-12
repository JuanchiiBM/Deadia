import React from 'react'
import DataTable from 'datatables.net-react';
import '../../../styles/dataTables.css'
import DT from 'datatables.net-dt';
import SpinnerForTables from '@/components/spinnerTables/SpinnerForTables';
import { useJsonData } from '@/hooks/useJsonData';
import { useDTUsers } from '@/hooks/sistema/usuariosOld/useDTUser';

DataTable.use(DT);

interface ITableActions {

}

const TableActions: React.FC<ITableActions> = () => {
    const { isLoading, jsonData } = useJsonData({ url: 'asd' })
    //const {tableData, columnsData} = useTableDataForUsers(jsonData)

    const tableData: any = []
    const columnsData: any = []

    return (
        <div className='w-full bg-background-200 rounded-lg'>
            {isLoading == true ? <SpinnerForTables /> :
                <DataTable data={tableData} className='order-column text-sm' columns={columnsData} options={{
                    destroy: true,
                     
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

export default TableActions
