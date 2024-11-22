import React from 'react'
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import SpinnerForModalTables from '@/components/spinnerTables/SpinnerForModalTables';
import { useJsonData } from '@/hooks/useJsonData';
import { useTableDataForUsers } from '@/hooks/sistema/usuarios/useDTUser';

DataTable.use(DT);


const ModalTableProfiles = () => {
    const { isLoading, jsonData } = useJsonData({ url: 'asd' })
    //const {tableData, columnsData} = useTableDataForUsers(jsonData)

    const tableData: any = []
    const columnsData: any = []

    return (
        <div className='w-full'>
            {isLoading == true ? <SpinnerForModalTables /> :
                <DataTable data={tableData} className='order-column text-sm' columns={columnsData} options={{
                    destroy: true,
                    responsive: true,
                    paging: false,
                    scrollY: '250',
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

export default ModalTableProfiles
