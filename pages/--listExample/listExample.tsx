"use client"

import React, { useState } from 'react';
import { useDisclosure } from "@nextui-org/react";

import Options from '@/components/options/options'
import TableData from '@/components/dataTable/dataTable';
import ModalView from '@/components/modal/modal';
import ModalContent from './components/modalContent';

import { ContextRegister } from '@/context/contextRegister';
import { MODULES } from '@/utils/enums/permissions';

import useDatePicker from '@/hooks/useDatePicker';
import useSetDTAContent from '@/hooks/useSetDTAContent';
import useJsonData from '@/hooks/useJsonData';

import useDT from './hooks/useDT';
import useForm from './hooks/useForm';
import useUpdate from './hooks/useUpdate';
import useSetDataObject from './hooks/useSetDataObject';

const title = 'ListExample'

const ListExample = () => {
    const [refreshData, setRefreshData] = useState(0)
	const [isUpdate, setIsUpdate] = useState(false)
	const [contentTable, setContentTable] = useState()
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { dateSelected, dateRef, selectDateRange } = useDatePicker()
    const { jsonData, isLoading } = useJsonData({ url: `api/user/register?start_date=2024-01-01&end_date=${dateSelected && dateSelected[1]}`, refreshData })
    
    const useDTAContent = useSetDTAContent({ module: 'usuario', urlDelete: 'api/user/register/', urlPut: 'api/user/register/form/' })
    const urlPost = 'api/user/register'
    const { tableData, columns, columnDefs } = useDT({jsonData, refreshData})

    const { dataForm, handleInputChange, setDataForm } = useForm()
    const { oldRegister } = useUpdate({ setDataForm, contentTable, isOpen })
    const { _dataObject } = useSetDataObject({ dataForm })

    return (
        <ContextRegister.Provider value={{
            jsonData: jsonData,
            jsonIsLoading: isLoading,
            dataForm: dataForm,
            handleInputChange: handleInputChange,
            update: isUpdate,
            setUpdate: setIsUpdate,
            refreshData: refreshData,
            setRefreshData: setRefreshData,
            contentTable: contentTable,
            setContentTable: setContentTable
        }}>
            <h1 className='text-4xl'>{title}</h1>
            <div className='w-full my-[50px] bg-background-200 h-[80px] flex justify-between p-5 rounded-lg shadow-md'>
                <Options title={title} buttonTitle='Crear Example' altButtonTitle='Crear Example' MODULE={MODULES.MODULEUSER} onOpen={onOpen} dateRef={dateRef} selectDateRange={selectDateRange} exportExcel={true} dateTime={true} />
            </div>
            <div className='bg-background-200 rounded-lg'>
                <TableData onOpen={onOpen} title={title} useDTAContent={useDTAContent} tableData={tableData} columns={columns} setColumnDefs={columnDefs} />
            </div>
            <ModalView size='xl' text='usuario' isOpen={isOpen} onClose={onClose} onOpen={onOpen} _dataObject={_dataObject} urlPost={urlPost} oldRegister={oldRegister}>
                <ModalContent/>
            </ModalView>
        </ContextRegister.Provider>
    )
}

export default ListExample
