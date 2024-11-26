"use client"

import React, { useState } from 'react'
import OptionsRegistrarEgreso from './options'
import DataTableEgresos from './tableEgresos';
import ModalEgresos from './modal';
import { useDisclosure } from '@nextui-org/react';
import { useJsonData } from '@/hooks/useJsonData';
import { EgressRegisterContext } from '@/hooks/egresos/registrarEgreso/useContext';
import { useDatePicker } from '@/hooks/useDatePicker';

const RegistrarEgreso = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [refreshData, setRefreshData] = useState(0)
	const [isUpdate, setIsUpdate] = useState(false)
	const [contentModal, setContentModal] = useState()
	const {dateSelected, dateRef, selectDateRange} = useDatePicker()
	const { jsonData, isLoading } = useJsonData({ url: `api/loss/register?start_date=${dateSelected && dateSelected[0]}&end_date=${dateSelected && dateSelected[1]}` })

	return (
		<EgressRegisterContext.Provider value={{
			jsonData: jsonData,
			jsonIsLoading: isLoading,
			update: isUpdate,
			setUpdate: setIsUpdate,
			refreshData: refreshData,
			setRefreshData: setRefreshData
		}}>
			<h1 className='text-4xl'>Egresos</h1>
			<OptionsRegistrarEgreso onOpen={onOpen} dateRef={dateRef} selectDateRange={selectDateRange} setContentModal={setContentModal} />
			<DataTableEgresos setContentModal={setContentModal} onOpen={onOpen}/>
			<ModalEgresos isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
		</EgressRegisterContext.Provider>
	)
}

export default RegistrarEgreso