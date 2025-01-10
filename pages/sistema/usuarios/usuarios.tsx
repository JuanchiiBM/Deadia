"use client"

import React, { useState } from 'react'
import Options from './options'
import TableData from './dataTable';
import StatsUsers from './stats';
import ModalView from './modal';
import { useDisclosure } from '@nextui-org/react';
import { useJsonData } from '@/hooks/useJsonData';
import { ContextRegister } from '@/hooks/useContextRegister';
import { useDatePicker } from '@/hooks/useDatePicker';

const usuarios = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [refreshData, setRefreshData] = useState(0)
	const [isUpdate, setIsUpdate] = useState(false)
	const [contentModal, setContentModal] = useState()
	const {dateSelected, dateRef, selectDateRange} = useDatePicker()
	const { jsonData, isLoading } = useJsonData({ url: `api/user/register?start_date=2024-01-01&end_date=${dateSelected && dateSelected[1]}`, refreshData })

	return (
		<ContextRegister.Provider value={{
			jsonData: jsonData,
			jsonIsLoading: isLoading,
			update: isUpdate,
			setUpdate: setIsUpdate,
			refreshData: refreshData,
			setRefreshData: setRefreshData,
			contentModal: contentModal,
			setContentModal: setContentModal
		}}>
			<h1 className='text-4xl'>Usuarios</h1>
			<Options onOpen={onOpen} dateRef={dateRef} selectDateRange={selectDateRange} />
			<div className='flex'>
                <div className='w-[25%] h-auto mr-[50px] bg-background-200 flex flex-col justify-start p-5 rounded-lg shadow-md'>
                    <StatsUsers />
                </div>
                <TableData onOpen={onOpen}/>
            </div>
			<ModalView isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
		</ContextRegister.Provider>
	)
}

export default usuarios