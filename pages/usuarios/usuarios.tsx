"use client"

import React, { useState } from 'react'
import ModalUsers from './modal'
import { useDisclosure } from '@nextui-org/react'

const Usuarios = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <h1 className='text-4xl'>Sistema</h1>
            <div className='w-full my-[50px] bg-background-200 h-[80px] flex justify-between p-5 rounded-lg shadow-md'>
                
            </div>
            <ModalUsers />
        </>
    )
}

export default Usuarios
