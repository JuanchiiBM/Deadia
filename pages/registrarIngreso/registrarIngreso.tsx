"use client"

import React from 'react'
import OptionsRegistrarIngreso from './options'
import DataTableRegistrarIngreso from './dataTable'
import ModalRegistrarIngreso from './modal'
import { useDisclosure } from '@nextui-org/react'

const RegistrarIngreso = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <h1 className='text-4xl'>Ingresos</h1>
            <OptionsRegistrarIngreso onOpen={onOpen} />
            <DataTableRegistrarIngreso />
            <ModalRegistrarIngreso isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
        </>
    )
}

export default RegistrarIngreso