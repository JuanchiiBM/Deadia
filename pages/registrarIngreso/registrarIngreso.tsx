"use client"

import React, { useState } from 'react'
import OptionsRegistrarIngreso from './options'
import DataTableRegistrarIngreso from './dataTable'
import ModalRegistrarIngreso from './modal'
import { useDisclosure } from '@nextui-org/react'

const RegistrarIngreso = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [contentModal, setContentModal] = useState()

    return (
        <>
            <h1 className='text-4xl'>Ingresos</h1>
            <OptionsRegistrarIngreso onOpen={onOpen} setContentModal={setContentModal} />
            <DataTableRegistrarIngreso isOpen={isOpen} onClose={onClose} onOpen={onOpen} setContentModal={setContentModal} />
            <ModalRegistrarIngreso isOpen={isOpen} onClose={onClose} onOpen={onOpen} contentModal={contentModal} />
        </>
    )
}

export default RegistrarIngreso