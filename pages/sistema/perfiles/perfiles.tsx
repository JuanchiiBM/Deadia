"use client"

import React, { useState } from 'react'
import OptionsProfiles from './options'
import TableProfiles from './dataTable'
import ModalProfiles from './modal'
import { useDisclosure } from '@nextui-org/react'

const Perfiles = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <h1 className='text-4xl'>Sistema</h1>
            <OptionsProfiles onOpen={onOpen} />
            <TableProfiles />
            <ModalProfiles isOpen={isOpen} onClose={onClose} />
        </>
    )
}

export default Perfiles
