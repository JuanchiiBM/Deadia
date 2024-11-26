'use client'

import React from 'react'
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { colourStylesBordered } from '@/helpers/selects';
import { IModalSelectsRegistrarIngreso } from '@/helpers/interfaces';
import { useSelectHandleChangeInscription, useSelectOptionsInscription } from '@/hooks/inscripciones/registrarInscripcion/useSelectOptionsInscription';
import { useUpdateContext } from '@/hooks/inscripciones/registrarInscripcion/useUpdateContext';
import { useChargeSelect } from '@/hooks/inscripciones/registrarInscripcion/useChargeSelect';
import { Input, DateRangePicker } from '@nextui-org/react'
import { I18nProvider } from "@react-aria/i18n";

const ModalSelectsRegistrarIngreso: React.FC<IModalSelectsRegistrarIngreso> = ({ jsonData, contentModal, studentInfo, handleInputChange }) => {
    const { options, chargueNewClassroom } = useSelectOptionsInscription({ jsonData })
    const { selectOptionOfClassroom, selectOptionOfDependency, classroomCreated, isDisabled, curseDisabled }
        = useSelectHandleChangeInscription({ jsonData, contentModal, chargueNewClassroom, handleInputChange })
    const { update, setUpdate } = useUpdateContext()
    const { } = useChargeSelect({ studentInfo, jsonData, selectOptionOfClassroom })


    return (
        <>
            <div className='flex gap-2 mb-2 mt-8'>
                <CreatableSelect maxMenuHeight={140} value={studentInfo.classroom} onChange={(newValue: any) => selectOptionOfClassroom(newValue)} onCreateOption={classroomCreated} className='w-[33%]' options={options.classroom} placeholder='Aula' noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} isSearchable styles={colourStylesBordered}></CreatableSelect>
                <Select maxMenuHeight={140} value={studentInfo.dependency} onChange={(newValue: any) => selectOptionOfDependency(newValue)} isClearable isDisabled={!update && isDisabled} className='w-[33%]' options={options.dependency} placeholder='Dependencias' noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} isSearchable styles={colourStylesBordered}></Select>
                <Select maxMenuHeight={140} value={studentInfo.curse} onChange={(newValue: any) => handleInputChange('curse', newValue)} isClearable isDisabled={!update && curseDisabled} className='w-[33%]' options={options.grade} placeholder='Curso' noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} isSearchable styles={colourStylesBordered}></Select>
            </div>
            <div className='flex gap-2'>
                <Input maxLength={20} value={studentInfo.amount ? studentInfo.amount : ''} onChange={(e) => handleInputChange('amount', e.currentTarget.value)} className='m-0' classNames={{ mainWrapper: 'flex justify-end' }} variant='bordered' labelPlacement='outside' placeholder='$' type="number" label='Monto' required />
                <I18nProvider locale='es-ES'>
                    <DateRangePicker visibleMonths={2} value={studentInfo.datePicker} isDisabled={!update && isDisabled} onChange={(e) => { handleInputChange('datePicker', e) }} id='datepicker' variant='bordered' label='Duración del Curso' labelPlacement='outside' className="max-w-xs transition-all" classNames={{
                        input: 'bg-background hover:bg-background focus:bg-background disabled:!text-default-400',
                        inputWrapper: 'bg-background hover:!bg-background focus:bg-background disabled:!text-default-400',
                    }} />
                </I18nProvider>
            </div>
        </>
    )
}

export default ModalSelectsRegistrarIngreso