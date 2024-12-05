"use client"

import React, { useState } from 'react'
import Options from './options'
import TableData from './dataTable';
import ModalView from './modal';
import { useDisclosure } from '@nextui-org/react';
import { useJsonData } from '@/hooks/useJsonData';
import { ContextRegister } from '@/hooks/useContextRegister';
import { useDatePicker } from '@/hooks/useDatePicker';

const registrarInventario = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [refreshData, setRefreshData] = useState(0)
	const [isUpdate, setIsUpdate] = useState(false)
	const [contentModal, setContentModal] = useState()
	const {dateSelected, dateRef, selectDateRange} = useDatePicker()
	const { jsonData, isLoading } = useJsonData({ url: `api/inventory/register?start_date=${dateSelected && dateSelected[0]}&end_date=${dateSelected && dateSelected[1]}`, refreshData })

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
			<h1 className='text-4xl'>Inventario</h1>
			<Options onOpen={onOpen} dateRef={dateRef} selectDateRange={selectDateRange} />
			<TableData onOpen={onOpen}/>
			<ModalView isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
		</ContextRegister.Provider>
	)
}

export default registrarInventario