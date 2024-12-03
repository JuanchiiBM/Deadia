import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { faCalendarCheck, faCalendarXmark } from '@fortawesome/free-regular-svg-icons'
import Image from 'next/image'
import { IUseFormInscription } from '@/helpers/interfaces'

const ModalResumenRegistrarIngreso: React.FC<{studentInfo: IUseFormInscription}> = ({ studentInfo }) => {
    return (
        <section className='flex flex-col gap-2 w-[30%] m-0'>
            <div className='rounded-xl p-2 border-2 border-default-200 w-full h-[30%]'>
                <h3 className='underline text-md w-full flex justify-between items-center'><span>Alumno</span><FontAwesomeIcon icon={faUserCircle} /></h3>
                <div className='flex flex-col justify-between h-[80%]'>
                    <p className='text-sm truncate'>- {studentInfo.dni}</p>
                    <p className='text-sm truncate'>- {studentInfo.grade?.label && studentInfo.grade.label} {studentInfo.name} {studentInfo.lastname}</p>
                    <p className='text-sm truncate'>- {studentInfo.mail}</p>
                    <p className='text-sm truncate'>- {studentInfo.category?.label && studentInfo.category.label}</p>
                </div>
            </div>
            <div className='rounded-xl p-2 py-4 border-2 border-default-200 w-full h-[70%] items-center flex flex-col'>
                <Image src='/img/loadImg.png' alt='Logo' width={100} height={100} />
                <div className='w-full h-[90%] flex flex-col justify-end'>
                    <div className='w-full mt-5'>
                        <h3 className='text-lg text-center'>{studentInfo.classroom?.label ? studentInfo.classroom?.label : 'Aula'}</h3>
                        <div className='flex flex-col w-full text-start border-t-1'>
                            <p><FontAwesomeIcon icon={faCalendarCheck} className='mr-3' />{studentInfo.datePicker && studentInfo.datePicker.start ? `${studentInfo.datePicker.start.day} / ${studentInfo.datePicker.start.month} / ${studentInfo.datePicker.start.year}` : '-- / -- / ----'}</p>
                            <p><FontAwesomeIcon icon={faCalendarXmark} className='mr-3' />{studentInfo.datePicker && studentInfo.datePicker.end ? `${studentInfo.datePicker.end.day} / ${studentInfo.datePicker.end.month} / ${studentInfo.datePicker.end.year}` : '-- / -- / ----'}</p>
                        </div>
                    </div>
                    <div className='w-full mt-5'>
                        <h3 className='text-lg text-center'>{studentInfo.dependency?.label ? studentInfo.dependency?.label : 'Dependencia'}</h3>
                        <div className='flex flex-col w-full text-start border-t-1'>
                            <p className='truncate'><FontAwesomeIcon icon={faDollarSign} className='mr-3' />{studentInfo.amount?.label && studentInfo.amount.label}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ModalResumenRegistrarIngreso