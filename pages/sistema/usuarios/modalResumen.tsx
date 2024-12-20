import React from 'react'
import { IUseFormUsers } from '@/helpers/interfaces'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faUser, faLock, faEnvelope, faIdCardClip } from '@fortawesome/free-solid-svg-icons'

const ModalResumen: React.FC<{dataForm: IUseFormUsers}> = ({ dataForm }) => {

    return (
        <section className='flex flex-col justify-around gap-2 w-[33%] h-auto m-0 pl-6'>
            <p className='text-sm truncate'><FontAwesomeIcon icon={faAddressCard} className='text-xs mr-1 w-4'/> {dataForm.name} {dataForm.lastname}</p>           
            <p className='text-sm truncate'><FontAwesomeIcon icon={faUser} className='text-xs mr-1 w-4'/> {dataForm.user}</p>
            <p className='text-sm truncate'><FontAwesomeIcon icon={faLock} className='text-xs mr-1 w-4'/> {dataForm.password}</p>
            <p className='text-sm truncate'><FontAwesomeIcon icon={faEnvelope} className='text-xs mr-1 w-4'/> {dataForm.mail}</p>
            <p className='text-sm truncate'><FontAwesomeIcon icon={faIdCardClip} className='text-xs mr-1 w-4'/> {dataForm.dependency && dataForm.profile ? `${dataForm.profile.label} de ${dataForm.dependency.label}` : ''}</p>
        </section>
    )
}

export default ModalResumen