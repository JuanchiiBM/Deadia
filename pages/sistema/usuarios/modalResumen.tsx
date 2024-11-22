import React from 'react'
import { IModalResumenUsers } from '@/helpers/interfaces'


const ModalResumenUsers: React.FC <IModalResumenUsers> = ({ userForm }) => {
  return (
    <div className='border-l-1 w-[30%] px-[15px] flex flex-col justify-around'>
      <p className='text-sm truncate'>- {userForm.nombre} {userForm.apellido}</p>
      <p className='text-sm truncate'>- {userForm.usuario}</p>
      <p className='text-sm truncate'>- {userForm.mail}</p>
      <p className='text-sm truncate'>- {userForm.perfil}</p>
      <p className='text-sm truncate'>- {userForm.dependencia}</p>
    </div>
  )
}

export default ModalResumenUsers