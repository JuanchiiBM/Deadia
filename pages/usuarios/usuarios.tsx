import React, { useState } from 'react'
import OptionsUsers from './options'
import ModalUsers from './modal'
import { useDisclosure } from '@nextui-org/react'

const Usuarios = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [contentModal, setContentModal] = useState()
    const [tableLoader, setTableLoader] = useState(true);

    return (
        <>
            <h1 className='text-4xl'>Sistema</h1>
            <div className='w-full my-[50px] bg-background-200 h-[80px] flex justify-between p-5 rounded-lg shadow-md'>
                
            </div>
            <OptionsUsers />
            <ModalUsers />
        </>
    )
}

export default Usuarios
