"use client"

import React, { useEffect } from 'react'
import { Button } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'

interface IOptionsRegistrarIngreso {
    onOpen: () => void
}

const OptionsRegistrarIngreso: React.FC<IOptionsRegistrarIngreso> = ({ onOpen }) => {

    useEffect(() => {
        onOpen()
    }, [])
    return (
        <div className='w-full my-[50px] bg-background-200 h-[110px] flex justify-between p-5 rounded-lg shadow-md'>
            <h2 className='content-center text-xl'>Registrar Ingresos</h2>
            <Button onClick={onOpen} className='content-center h-full text-conntent2 text-md' color='primary' startContent={
                <FontAwesomeIcon icon={faUserPlus} className='text-content2  text-xl'/>
            }>Crear Registro</Button>
        </div>
    )
}

export default OptionsRegistrarIngreso