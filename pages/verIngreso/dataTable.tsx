import React from 'react'
import DataTable from 'datatables.net-react';
import '../../styles/dataTables.css'
import DT from 'datatables.net-dt';

DataTable.use(DT);

interface ITableVerIngreso {
    tableKey: React.Key | null | undefined
    tableRef: any
    tableData: any[]
    columns: any[]
}

const TableVerIngreso: React.FC<ITableVerIngreso> = ({ tableKey, tableRef, tableData, columns }) => {
    
  return (
    <div className='h-[500px]'>
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
      </div>
  )
}

export default TableVerIngreso