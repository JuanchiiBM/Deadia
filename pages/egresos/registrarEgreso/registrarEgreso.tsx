"use client"

import React, { useState } from 'react'
import OptionsRegistrarEgreso from './options'
import DataTableEgresos from './tableEgresos';
import ModalEgresos from './modal';
import { useDisclosure } from '@nextui-org/react';
import { useJsonData } from '@/hooks/useJsonData';
import { EgressRegisterContext } from '@/hooks/egresos/registrarEgreso/useContext';


const RegistrarEgreso = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { jsonData, isLoading } = useJsonData({ url: 'egress' })
	const [refreshData, setRefreshData] = useState(0)

	return (
		<EgressRegisterContext.Provider value={{
			jsonData: jsonData,
			jsonIsLoading: isLoading,
			refreshData: refreshData,
			setRefreshData: setRefreshData
		}}>
			<h1 className='text-4xl'>Egresos</h1>
			<OptionsRegistrarEgreso onOpen={onOpen} />
			<DataTableEgresos />
			<ModalEgresos isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
		</EgressRegisterContext.Provider>
	)
}

export default RegistrarEgreso