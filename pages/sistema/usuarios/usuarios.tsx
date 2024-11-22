"use client"

import React, { useState } from 'react'
import ModalUsers from './modal'
import { useDisclosure } from '@nextui-org/react'
import StatsUsers from './stats'
import TableUsers from './dataTable'
import OptionsUsers from './options'

const Usuarios = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <h1 className='text-4xl'>Sistema</h1>
            <OptionsUsers onOpen={onOpen} />
            <div className='flex'>
                <div className='w-[25%] h-auto mr-[50px] bg-background-200 h-[80px] flex justify-between p-5 rounded-lg shadow-md'>
                    <StatsUsers />
                </div>
                <TableUsers />
            </div>
            <ModalUsers isOpen={isOpen} onClose={onClose} />
        </>
    )
}

export default Usuarios
