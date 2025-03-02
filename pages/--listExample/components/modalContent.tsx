import React from 'react'
import { Input } from "@nextui-org/react"
import { useContextRegister } from '@/context/contextRegister'

const ModalContent = () => {
    const {dataForm, handleInputChange} = useContextRegister()

    return (
        <div>
            <Input required variant='bordered' label='Nombre' labelPlacement='outside' value={dataForm.name} onChange={(e: any) => handleInputChange('name', e.target.value)} />
        </div>
    )
}

export default ModalContent
