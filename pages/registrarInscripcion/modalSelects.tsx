import React, { useEffect, useRef, useState } from 'react'
import Select, { SelectInstance } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { colourStylesBordered } from '@/helpers/selects';
import { GETFunction, createOption, Option, formatDate } from '@/utils/globals';
import { parseDate } from "@internationalized/date";
import { IUseFormInscription, IncomeRegisterOptions, IncomeRegisterOptionClassroom } from '@/helpers/interfaces';
import { RangeValue } from '@nextui-org/react';
import { useSelectOptionsInscription } from '@/hooks/useSelectOptionsInscription';



interface IModalSelectsRegistrarIngreso {
    setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>
    isDisabled: boolean
    contentModal: any
    jsonIsCharged: boolean
    jsonData: IncomeRegisterOptions
    studentInfo: IUseFormInscription
    handleInputChange: (field: string, value: string | RangeValue<any> | undefined | Option | null) => void
}

const ModalSelectsRegistrarIngreso: React.FC<IModalSelectsRegistrarIngreso> = ({ jsonIsCharged, jsonData, contentModal, setIsDisabled, isDisabled, studentInfo, handleInputChange }) => {
    const { options, chargueNewClassroom } = useSelectOptionsInscription({ jsonData: jsonData })
    
    const [curseDisabled, setCurseDisabled] = useState<boolean>(true)

    const classroomCreated = (inputValue: string) => {
        const newOption = createOption(inputValue)
        chargueNewClassroom(newOption)
        handleInputChange('classroom', newOption)
        handleInputChange('curse', undefined)
        handleInputChange('dependency', undefined)
        handleInputChange('datePicker', { start: null, end: null })
        setIsDisabled(false)
        setOptionsCurse()
        setOptionsDependency()
    }

    const setOptionsCurse = async (setValue?: IncomeRegisterOptionClassroom) => {
        if (setValue) {
            const option: Option = { label: setValue.curso, value: setValue.id_curso.toString() }
            handleInputChange('curse', option)
        }
    }

    const setOptionsDependency = async (setValue?: IncomeRegisterOptionClassroom) => {
        if (setValue) {
            const option: Option = { label: setValue.dependencia, value: setValue.id_dependencia.toString() }
            handleInputChange('dependency', option)
        }
    }

    const selectOptionOfClassroom = async (newValue: Option) => {
        handleInputChange('classroom', newValue)
        if (jsonData?.classrooms.some((opt: IncomeRegisterOptionClassroom) => opt.id.toString() == newValue.value)) {
            setIsDisabled(true)
            jsonData.classrooms.forEach((opt: IncomeRegisterOptionClassroom) => {
                if (opt.id.toString() == newValue.value) {

                    setOptionsCurse(opt)
                    setOptionsDependency(opt)
                    handleInputChange('datePicker', {
                        start: parseDate(formatDate(opt.fec_inicio)),
                        end: parseDate(formatDate(opt.fec_finalizacion))
                    })
                }
            })
        } else {
            setIsDisabled(false)
            
            handleInputChange('curse', undefined)
            handleInputChange('dependency', undefined)
            handleInputChange('datePicker', {start: null, end: null})
        }
    }

    const selectOptionOfDependency = (newValue: Option) => {
        handleInputChange('dependency', newValue)
        newValue != null ? setCurseDisabled(false) : setCurseDisabled(true)
    }

    useEffect(() => {
        if (jsonData && contentModal && contentModal.aula) {
            const jsonClassroomFiltered = jsonData.classrooms.find((classroom) => { return classroom.codigo == contentModal.aula })
            console.log(jsonClassroomFiltered)
            const option: Option = {
                value: jsonClassroomFiltered?.id_curso.toString(),
                label: jsonClassroomFiltered?.codigo
            }
            selectOptionOfClassroom(option)
        }
    }, [jsonData])

    useEffect(() => {
        setIsDisabled(true)
    }, [])

    return (
        <div className='flex gap-2 mb-2 mt-8'>
            <CreatableSelect maxMenuHeight={140} value={studentInfo.classroom} onChange={(newValue: any) => selectOptionOfClassroom(newValue)} isDisabled={jsonIsCharged} onCreateOption={classroomCreated} className='w-[33%]' options={options.classroom} placeholder='Aula' noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} isSearchable styles={colourStylesBordered}></CreatableSelect>
            <Select maxMenuHeight={140} value={studentInfo.dependency} onChange={(newValue: any) => selectOptionOfDependency(newValue)} isClearable isDisabled={isDisabled} className='w-[33%]' options={options.dependency} placeholder='Dependencias' noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} isSearchable styles={colourStylesBordered}></Select>
            <Select maxMenuHeight={140} value={studentInfo.curse} onChange={(newValue: any) => handleInputChange('curse', newValue)} isClearable isDisabled={isDisabled || curseDisabled} className='w-[33%]' options={options.grade} placeholder='Curso' noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} isSearchable styles={colourStylesBordered}></Select>
        </div>
    )
}

export default ModalSelectsRegistrarIngreso