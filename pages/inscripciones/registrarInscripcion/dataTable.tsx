"use client"

import React from 'react'
import DataTable from 'datatables.net-react';
import '../../../styles/dataTables.css'
import DT from 'datatables.net-dt';
import 'datatables.net-responsive-dt';
import { UseDisclosureProps } from '@nextui-org/react';
import SpinnerForTables from '@/components/spinnerTables/SpinnerForTables';
import { IRegister } from '@/helpers/interfaces';
import { useJsonData } from '@/hooks/useJsonData';
import { useDTInscription } from '@/hooks/inscripciones/registrarInscripcion/useDTInscription';
import { useDTAInscription } from '@/hooks/inscripciones/registrarInscripcion/useDTAInscription';

DataTable.use(DT);

interface IDataTable extends UseDisclosureProps {
    setContentModal: React.Dispatch<React.SetStateAction<IRegister | any>>
    dateSelected: any[] | undefined
}

const DataTableRegistrarIngreso: React.FC<IDataTable> = ({ onOpen, setContentModal, dateSelected }) => {
    const {isLoading, jsonData} = useJsonData({url: `api/income/register?start_date=${dateSelected && dateSelected[0]}&end_date=${dateSelected && dateSelected[1]}`})
    const {tableData, columnsData} = useDTInscription({jsonData: jsonData})
    const {} = useDTAInscription({ tableData: tableData, setContentModal: setContentModal, onOpen: onOpen})

    return (
        <div className='bg-background-200 rounded-lg'>
            {isLoading == true ?
                <SpinnerForTables /> :
                <DataTable data={tableData} className='order-column text-sm' columns={columnsData} options={{
                    destroy: true,
                    responsive: true,
                    order: [[6, 'desc']],
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