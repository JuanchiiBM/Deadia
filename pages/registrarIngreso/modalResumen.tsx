import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { faCalendarCheck, faCalendarXmark } from '@fortawesome/free-regular-svg-icons'
import Image from 'next/image'

interface IModalResumenRegistrarIngreso {
    valueDNI: string | undefined
    valueNombre: string | undefined
    valueApellido: string | undefined
}

const ModalResumenRegistrarIngreso: React.FC<IModalResumenRegistrarIngreso> = ({ valueDNI, valueNombre, valueApellido }) => {
    return (
        <section className='flex flex-col gap-2 w-[30%] m-0'>
            <div className='rounded-xl p-2 border-2 border-default-200 w-full h-[30%]'>
                <h3 className='underline text-md w-full flex justify-between items-center'><span>Alumno</span><FontAwesomeIcon icon={faUserCircle} /></h3>
                <p className='text-sm truncate'>- {valueDNI}</p>
                <p className='text-sm truncate'>- {valueNombre}</p>
                <p className='text-sm truncate'>- {valueApellido}</p>
            </div>
            <div className='rounded-xl p-2 py-4 border-2 border-default-200 w-full h-[70%] items-center flex flex-col'>
                <Image src='/img/loadImg.png' alt='Logo' width={100} height={100} />
                <div className='w-full mt-5'>
                    <h3 className='text-lg text-center'>Aula</h3>
                    <div className='flex flex-col w-full text-start border-t-1'>
                        <p><FontAwesomeIcon icon={faCalendarCheck} className='mr-3'/>-- / -- / ----</p>
                        <p><FontAwesomeIcon icon={faCalendarXmark} className='mr-3'/>-- / -- / ----</p>
                    </div>
                </div>
                <div className='w-full mt-5'>
                    <h3 className='text-lg text-center'>Dependencia</h3>
                    <div className='flex flex-col w-full text-start border-t-1'>
                        <p><FontAwesomeIcon icon={faDollarSign} className='mr-3'/>-</p>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default ModalResumenRegistrarIngreso