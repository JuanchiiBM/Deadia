import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { faCalendarCheck, faCalendarXmark } from '@fortawesome/free-regular-svg-icons'
import Image from 'next/image'
import { Option } from '@/utils/globals'
import { RangeValue } from "@react-types/shared";

interface IModalResumenRegistrarIngreso {
    valueDNI: string | undefined
    valueNombre: string | undefined
    valueApellido: string | undefined
    valueMail: string | undefined
    valueCategory: Option | null | undefined
    valueGrade: Option | null | undefined
    valueClassroom: Option | null | undefined
    valueCurse: Option | null | undefined
    valueDependency: Option | null | undefined
    valueMonto: string | undefined
    valueDatePicker: RangeValue<any>
}

const ModalResumenRegistrarIngreso: React.FC<IModalResumenRegistrarIngreso> = ({ valueDNI, valueNombre, valueApellido, valueClassroom, valueCurse, valueDependency, valueMonto, valueCategory, valueGrade, valueDatePicker, valueMail }) => {
    return (
        <section className='flex flex-col gap-2 w-[30%] m-0'>
            <div className='rounded-xl p-2 border-2 border-default-200 w-full h-[30%]'>
                <h3 className='underline text-md w-full flex justify-between items-center'><span>Alumno</span><FontAwesomeIcon icon={faUserCircle} /></h3>
                <div className='flex flex-col justify-between h-[80%]'>
                    <p className='text-sm truncate'>- {valueDNI}</p>
                    <p className='text-sm truncate'>- {valueGrade?.label && valueGrade.label} {valueNombre} {valueApellido}</p>
                    <p className='text-sm truncate'>- {valueMail}</p>
                    <p className='text-sm truncate'>- {valueCategory?.label && valueCategory.label}</p>
                </div>
            </div>
            <div className='rounded-xl p-2 py-4 border-2 border-default-200 w-full h-[70%] items-center flex flex-col'>
                <Image src='/img/loadImg.png' alt='Logo' width={100} height={100} />
                <div className='w-full h-[90%] flex flex-col justify-end'>
                    <div className='w-full mt-5'>
                        <h3 className='text-lg text-center'>{valueClassroom?.label ? valueClassroom?.label : 'Aula'}</h3>
                        <div className='flex flex-col w-full text-start border-t-1'>
                            <p><FontAwesomeIcon icon={faCalendarCheck} className='mr-3' />{valueDatePicker && valueDatePicker.start ? `${valueDatePicker.start.day} / ${valueDatePicker.start.month} / ${valueDatePicker.start.year}` : '-- / -- / ----'}</p>
                            <p><FontAwesomeIcon icon={faCalendarXmark} className='mr-3' />{valueDatePicker && valueDatePicker.end ? `${valueDatePicker.end.day} / ${valueDatePicker.end.month} / ${valueDatePicker.end.year}` : '-- / -- / ----'}</p>
                        </div>
                    </div>
                    <div className='w-full mt-5'>
                        <h3 className='text-lg text-center'>{valueDependency?.label ? valueDependency?.label : 'Dependencia'}</h3>
                        <div className='flex flex-col w-full text-start border-t-1'>
                            <p className='truncate'><FontAwesomeIcon icon={faDollarSign} className='mr-3' />{valueMonto ? valueMonto : '-'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ModalResumenRegistrarIngreso