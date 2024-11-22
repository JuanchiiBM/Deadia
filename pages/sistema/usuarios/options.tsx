import React from 'react'
import { Button } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { UseDisclosureProps } from '@nextui-org/react'


const OptionsUsers: React.FC<UseDisclosureProps> = ({ onOpen }) => {
    
    return (
        <div className='w-full my-[50px] bg-background-200 h-[80px] flex justify-between p-5 rounded-lg shadow-md'>
            <h2 className='content-center text-xl'>Usuarios</h2>
            <Button onClick={onOpen} className='content-center h-full text-content2 text-md rounded-md' color='primary' startContent={
                <FontAwesomeIcon icon={faUserPlus} className='text-content2  text-xl' />
            }>Crear Usuario</Button>
        </div>
    )
}

export default OptionsUsers
