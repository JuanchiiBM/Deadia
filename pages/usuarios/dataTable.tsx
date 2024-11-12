import React from 'react'
import DataTable from 'datatables.net-react';
import '../../styles/dataTables.css'
import DT from 'datatables.net-dt';
import SpinnerForTables from '@/components/spinnerTables/SpinnerForTables';
import { useJsonData } from '@/hooks/useJsonData';
import { useTableDataForUsers } from '@/hooks/useTableDatas';

DataTable.use(DT);

interface ITableUsers {

}

const TableUsers: React.FC<ITableUsers> = () => {
    const {isLoading, jsonData} = useJsonData({url: 'asd'})
    const {tableData, columnsData} = useTableDataForUsers(jsonData)

    return (
        <div className='h-[500px]'>
            {isLoading == true && <SpinnerForTables />}
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
        </div>
    )
}

export default TableUsers