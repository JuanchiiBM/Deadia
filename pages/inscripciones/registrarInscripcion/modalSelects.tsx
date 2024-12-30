'use client'

import React, { useEffect } from 'react'
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { colourStylesBordered } from '@/helpers/selects';
import { IModalSelectsRegistrarIngreso } from '@/helpers/interfaces';
import { useSelectHandleChangeInscription, useSelectOptionsInscription } from '@/hooks/inscripciones/registrarInscripcion/useSelectOptionsInscription';
import { useUpdateContext } from '@/hooks/inscripciones/registrarInscripcion/useUpdateContext';
import { useChargeSelect } from '@/hooks/inscripciones/registrarInscripcion/useChargeSelect';
import { DateRangePicker } from '@nextui-org/react'
import { I18nProvider } from "@react-aria/i18n";

const ModalSelectsRegistrarIngreso: React.FC<IModalSelectsRegistrarIngreso> = ({ jsonData, contentModal, studentInfo, handleInputChange }) => {
    const { options, chargueNewClassroom } = useSelectOptionsInscription({ jsonData })
    const { selectOptionOfClassroom, selectOptionOfDependency, selectOptionOfCurse, classroomCreated, isDisabled, optionsAmount, curseDisabled }
        = useSelectHandleChangeInscription({ jsonData, contentModal, chargueNewClassroom, handleInputChange, studentInfo })
    const { update } = useUpdateContext()
    useChargeSelect({ studentInfo, jsonData, selectOptionOfClassroom, handleInputChange, optionsAmount })


    useEffect(() => {
        console.log('studentInfo', studentInfo)
    }, [studentInfo])

    return (
        <>
            <div className='flex gap-2 mb-2 mt-8'>
                <CreatableSelect maxMenuHeight={140} value={studentInfo.classroom} onChange={(newValue: any) => selectOptionOfClassroom(newValue, studentInfo.category.discount)} onCreateOption={classroomCreated} className='w-[33%]' options={options.classroom} placeholder='Aula' noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} isSearchable styles={colourStylesBordered} required></CreatableSelect>
                <Select maxMenuHeight={140} value={studentInfo.dependency} onChange={(newValue: any) => selectOptionOfDependency(newValue)} isClearable isDisabled={!update && isDisabled} className='w-[33%]' options={options.dependency} placeholder='Dependencias' noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} isSearchable styles={colourStylesBordered} required></Select>
                <Select maxMenuHeight={140} value={studentInfo.curse} onChange={(newValue: any) => selectOptionOfCurse(newValue, studentInfo.category.discount)} isClearable isDisabled={!update && curseDisabled} className='w-[33%]' options={options.grade} placeholder='Curso' noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} isSearchable styles={colourStylesBordered} required></Select>
            </div>
            <div className='flex gap-2'>
                <Select value={studentInfo.amount} onChange={(newValue: any) => handleInputChange('amount', newValue)} isDisabled={optionsAmount==undefined} className='m-0 self-end w-[50%]' options={optionsAmount} menuPlacement="top" placeholder='Monto' noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} isSearchable styles={colourStylesBordered} required></Select>
                <I18nProvider locale='es-ES'>
                    <DateRangePicker visibleMonths={2} value={studentInfo.datePicker} isDisabled={!update && isDisabled} onChange={(e) => { handleInputChange('datePicker', e) }} id='datepicker' variant='bordered' label='Duración del Curso' labelPlacement='outside' className="max-w-xs w-[50%] transition-all" classNames={{
                        input: 'bg-background hover:bg-background focus:bg-background disabled:!text-default-400',
                        inputWrapper: 'bg-background hover:!bg-background focus:bg-background disabled:!text-default-400',
                    }} />
                </I18nProvider>
            </div>
        </>
    )
}

export default ModalSelectsRegistrarIngreso