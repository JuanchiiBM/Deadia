import React from 'react'
import { Input } from "@nextui-org/react"
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'
import { useContextRegister } from '@/context/contextRegister'
import { DateRangePicker } from "@nextui-org/react"
import { I18nProvider } from "@react-aria/i18n";
import { colourStylesBordered } from '@/styles/selects'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { faCalendarCheck, faCalendarXmark } from '@fortawesome/free-regular-svg-icons'
import Image from 'next/image'

import { useSearchDNI } from '../hooks/useSearchDNI';
import { useSelectHandleChangeInscription, useSelectOptionsInscription, useSelectOptionsInscription2 } from '../hooks/useSelectOptionsInscription';
import { useChargeSelect, useChargeSelect2 } from '../hooks/useChargeSelect';

const ModalContent = ({ isOpen, optionsJsonData }: { isOpen: boolean, optionsJsonData: any }) => {
    const { dataForm, handleInputChange, update, contentTable } = useContextRegister()

    const { isLoadingDni, setDni } = useSearchDNI({ handleInputChange, optionsJsonData })
    const { options, chargueNewClassroom } = useSelectOptionsInscription({ optionsJsonData })
    const { selectOptionOfClassroom, selectOptionOfDependency, selectOptionOfCurse, classroomCreated, setOptionsAmount, isDisabled, optionsAmount, curseDisabled }
        = useSelectHandleChangeInscription({ optionsJsonData, contentTable, chargueNewClassroom, handleInputChange, dataForm })
    useChargeSelect({ dataForm, optionsJsonData, selectOptionOfClassroom, handleInputChange, optionsAmount, setOptionsAmount })
    const { options: options2, isDisabled: isDisabled2, selectCategory } = useSelectOptionsInscription2({ optionsJsonData, isOpen, handleInputChange })
    const { } = useChargeSelect2({ dataForm, optionsJsonData, selectCategory, handleInputChange })

    return (
        <main className='flex'>
            <section className='pr-6 border-r-1'>
                <div className='mb-8'>
                    <h3 className='w-full border-b-1 mb-2'>Datos del alumno:</h3>
                    <div className='flex gap-2'>
                        <Input maxLength={20} value={dataForm.dni ? dataForm.dni : ''} onChange={(e) => { setDni(e.currentTarget.value); handleInputChange('dni', e.currentTarget.value) }} variant='bordered' classNames={{ mainWrapper: 'flex justify-end mt-2' }} labelPlacement='outside' label='DNI' required type="number" isDisabled={update} />
                        <Input maxLength={30} value={dataForm.name ? dataForm.name : ''} onChange={(e) => handleInputChange('name', e.currentTarget.value)} variant='bordered' classNames={{ mainWrapper: 'flex justify-end mt-2' }} labelPlacement='outside' label='Nombre' required isDisabled={isLoadingDni} />
                        <Input maxLength={30} value={dataForm.lastname ? dataForm.lastname : ''} onChange={(e) => handleInputChange('lastname', e.currentTarget.value)} variant='bordered' classNames={{ mainWrapper: 'flex justify-end mt-2' }} labelPlacement='outside' label='Apellido' required isDisabled={isLoadingDni} />
                    </div>
                    <div className="mt-7">
                        <Input value={dataForm.mail ? dataForm.mail : ''} onChange={(e) => handleInputChange('mail', e.currentTarget.value)} variant='bordered' classNames={{ mainWrapper: 'flex justify-end mt-2' }} labelPlacement='outside' label='Mail' required type='mail' isDisabled={isLoadingDni} />
                        <div className='flex gap-2 mb-2 mt-8'>
                            <Select maxMenuHeight={200} value={dataForm?.category} onChange={(newValue: any) => selectCategory(newValue)} className='w-[50%]' isDisabled={isLoadingDni} options={options2.category} placeholder='Categoría' noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} isSearchable styles={colourStylesBordered} required></Select>
                            <Select maxMenuHeight={200} value={dataForm?.grade} onChange={(newValue: any) => handleInputChange('grade', newValue)} isDisabled={isDisabled2 || isLoadingDni} required={!isDisabled2} className='w-[50%]' options={options2.grade} placeholder='Grado' noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} isSearchable styles={colourStylesBordered}></Select>
                        </div>
                        <div className="flex mb-2 mt-8">
                            <Select maxMenuHeight={200} value={dataForm?.destination} onChange={(newValue: any) => handleInputChange('destination', newValue)} isDisabled={isDisabled2 || isLoadingDni} required={!isDisabled2} className='w-[100%]' options={options2.destination} placeholder='Destino' noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} isSearchable styles={colourStylesBordered}></Select>
                        </div>                    </div>
                </div>
                <div>
                    <h3 className='w-full border-b-1 mb-2'>Datos del aula:</h3>
                    <div className='flex gap-2 mb-2 mt-8'>
                        <CreatableSelect maxMenuHeight={140} value={dataForm.classroom} onChange={(newValue: any) => selectOptionOfClassroom(newValue, dataForm.category.discount)} onCreateOption={classroomCreated} className='w-[33%]' options={options.classroom} placeholder='Aula' noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} isSearchable styles={colourStylesBordered} required></CreatableSelect>
                        <Select maxMenuHeight={140} value={dataForm.dependency} onChange={(newValue: any) => selectOptionOfDependency(newValue)} isClearable isDisabled={isDisabled} className='w-[33%]' options={options.dependency} placeholder='Dependencias' noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} isSearchable styles={colourStylesBordered} required></Select>
                        <Select maxMenuHeight={140} value={dataForm.curse} onChange={(newValue: any) => selectOptionOfCurse(newValue, dataForm.category.discount)} isClearable isDisabled={curseDisabled} className='w-[33%]' options={options.grade} placeholder='Curso' noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} isSearchable styles={colourStylesBordered} required></Select>
                    </div>
                    <div className='flex gap-2'>
                        <Select value={dataForm.amount} onChange={(newValue: any) => handleInputChange('amount', newValue)} isDisabled={!dataForm.curse} className='m-0 self-end w-[50%]' options={optionsAmount} menuPlacement="top" placeholder='Monto' noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} isSearchable styles={colourStylesBordered} required></Select>
                        <I18nProvider locale='es-ES'>
                            <DateRangePicker visibleMonths={2} value={dataForm.datePicker} isDisabled={curseDisabled} onChange={(e) => { handleInputChange('datePicker', e) }} id='datepicker' variant='bordered' label='Duración del Curso' labelPlacement='outside' className="max-w-xs w-[50%] transition-all" classNames={{
                                input: 'bg-background hover:bg-background focus:bg-background disabled:!text-default-400',
                                inputWrapper: 'bg-background hover:!bg-background focus:bg-background disabled:!text-default-400',
                            }} />
                        </I18nProvider>
                    </div>
                </div>
            </section>
            <section className='flex flex-col gap-2 w-[30%] m-0 pl-6'>
                <div className='rounded-xl p-2 border-2 border-default-200 w-full h-[30%]'>
                    <h3 className='underline text-md w-full flex justify-between items-center'><span>Alumno</span><FontAwesomeIcon icon={faUserCircle} /></h3>
                    <div className='flex flex-col justify-between h-[80%]'>
                        <p className='text-sm truncate'>- {dataForm.dni}</p>
                        <p className='text-sm truncate'>- {dataForm.grade?.label && dataForm.grade.label} {dataForm.name} {dataForm.lastname}</p>
                        <p className='text-sm truncate'>- {dataForm.mail}</p>
                        <p className='text-sm truncate'>- {dataForm.category?.label && dataForm.category.label}</p>
                    </div>
                </div>
                <div className='rounded-xl p-2 py-4 border-2 border-default-200 w-full h-[70%] items-center flex flex-col'>
                    <Image src='/img/loadImg.png' alt='Logo' width={100} height={100} />
                    <div className='w-full h-[90%] flex flex-col justify-end'>
                        <div className='w-full mt-5'>
                            <h3 className='text-lg text-center'>{dataForm.classroom?.label ? dataForm.classroom?.label : 'Aula'}</h3>
                            <div className='flex flex-col w-full text-start border-t-1'>
                                <p><FontAwesomeIcon icon={faCalendarCheck} className='mr-3' />{dataForm.datePicker && dataForm.datePicker.start ? `${dataForm.datePicker.start.day} / ${dataForm.datePicker.start.month} / ${dataForm.datePicker.start.year}` : '-- / -- / ----'}</p>
                                <p><FontAwesomeIcon icon={faCalendarXmark} className='mr-3' />{dataForm.datePicker && dataForm.datePicker.end ? `${dataForm.datePicker.end.day} / ${dataForm.datePicker.end.month} / ${dataForm.datePicker.end.year}` : '-- / -- / ----'}</p>
                            </div>
                        </div>
                        <div className='w-full mt-5'>
                            <h3 className='text-lg text-center'>{dataForm.dependency?.label ? dataForm.dependency?.label : 'Dependencia'}</h3>
                            <div className='flex flex-col w-full text-start border-t-1'>
                                <p className='truncate'><FontAwesomeIcon icon={faDollarSign} className='mr-3' />{dataForm.amount?.label && dataForm.amount.label}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default ModalContent
