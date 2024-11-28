"use client"

import React from 'react'
import DataTable from 'datatables.net-react';
import moment from 'moment';
import '../../../styles/dataTables.css'
import DT from 'datatables.net-dt';
import 'datatables.net-responsive-dt';
import { UseDisclosureProps } from '@nextui-org/react';
import SpinnerForTables from '@/components/spinnerTables/SpinnerForTables';
import { IRegister } from '@/helpers/interfaces';
import { useJsonData } from '@/hooks/useJsonData';
import { useDTInscription } from '@/hooks/inscripciones/registrarInscripcion/useDTInscription';
import { useDTAInscription } from '@/hooks/inscripciones/registrarInscripcion/useDTAInscription';
import { useUpdateContext } from '@/hooks/inscripciones/registrarInscripcion/useUpdateContext';

DataTable.use(DT);

interface IDataTable extends UseDisclosureProps {
    setContentModal: React.Dispatch<React.SetStateAction<IRegister | any>>
    dateSelected: any[] | undefined
}

const DataTableRegistrarIngreso: React.FC<IDataTable> = ({ onOpen, setContentModal, dateSelected }) => {
    const { refreshData } = useUpdateContext()
    const {isLoading, jsonData} = useJsonData({url: `api/income/register?start_date=${dateSelected && dateSelected[0]}&end_date=${dateSelected && dateSelected[1]}`, refreshData})
    const {tableData, columnsData} = useDTInscription({jsonData: jsonData})
    const {} = useDTAInscription({ tableData: tableData, setContentModal: setContentModal, onOpen: onOpen})

    return (
        <div className='bg-background-200 rounded-lg'>
            {isLoading == true ?
                <SpinnerForTables /> :
                <DataTable data={tableData} className='order-column text-sm' columns={columnsData} options={{
                    destroy: true,
                    responsive: true,
                    order: [[0, 'desc']],
                    columnDefs: [
                        { "width": "5%", "targets": 0 },
                        { "width": "10%", "targets": 1 },
                        { "width": "20%", "targets": 2 },
                        { "width": "10%", "targets": 3 },
                        { "width": "5%", "targets": 4 },
                        { "width": "5%", "targets": 5 },
                        { "width": "10%", "targets": 6 },
                        { "width": "10%", "targets": 7 },
                        { "width": "20%", "targets": 8 },
                        { "width": "5%", "targets": 9 },
                    ],
                    language: {
                        url: '../dataTableLanguaje.json',
                    },
                }} >
                    <thead>
                        <tr>
                            {columnsData.map((col, index) => (
                                <th className='truncate' key={index}>{col.data}</th>
                            ))}
                        </tr>
                    </thead>
                </DataTable>
            }
        </div>
    )
}

export default DataTableRegistrarIngreso