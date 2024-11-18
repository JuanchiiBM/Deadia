import React, { useEffect, useRef, useState } from 'react'
import Select, { SelectInstance } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { colourStylesBordered } from '@/helpers/selects';
import { GETFunction, createOption, Option, formatDate } from '@/utils/globals';
import { parseDate } from "@internationalized/date";
import { IncomeRegisterOptions, IncomeRegisterOptionClassroom } from './modal';
import { IUseFormInscription } from '@/helpers/interfaces';
import { RangeValue } from '@nextui-org/react';



interface IModalSelectsRegistrarIngreso {
    setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>
    isDisabled: boolean
    contentModal: any
    jsonIsCharged: boolean
    jsonData: IncomeRegisterOptions
    studentInfo: IUseFormInscription
    handleInputChange: (field: string, value: string | RangeValue<any> | undefined | Option) => void
}

const ModalSelectsRegistrarIngreso: React.FC<IModalSelectsRegistrarIngreso> = ({ jsonIsCharged, jsonData, contentModal, setIsDisabled, isDisabled, studentInfo, handleInputChange }) => {
    const [optClassroom, setOptClassroom] = useState<any>(undefined)
    const [listOfData, setListOfData] = useState<IncomeRegisterOptions | undefined>(undefined)
    const [optCurse, setOptCurse] = useState<any>(undefined)
    const [curseDisabled, setCurseDisabled] = useState<boolean>(true)
    const [optDependency, setOptDependency] = useState<any>(undefined)
    const selectCurse = useRef(null)
    const selectDeps = useRef(null)

    const setOptions = async () => {
        setListOfData(jsonData)
        console.log(jsonData)
        const optionsClassrooms = jsonData.classrooms.map((opt) => ({
            value: opt.id,
            label: opt.codigo
        }))
        const optionsDeps = jsonData.deps.map((opt) => ({
            value: opt.id,
            label: opt.dependencia
        }))
        setOptClassroom(optionsClassrooms)
        setOptDependency(optionsDeps)
    }

    const classroomCreated = (inputValue: string) => {
        const newOption = createOption(inputValue)
        setOptClassroom((prev: any) => [...prev, newOption]);
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
        console.log(listOfData?.classrooms.some((opt: IncomeRegisterOptionClassroom) => opt.id.toString() == newValue.value))
        if (listOfData?.classrooms.some((opt: IncomeRegisterOptionClassroom) => opt.id.toString() == newValue.value)) {
            setIsDisabled(true)
            listOfData.classrooms.forEach((opt: IncomeRegisterOptionClassroom) => {
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
        chargeOptionsCurse()
    }

    const selectOptionOfCurse = (newValue: Option) => {
        handleInputChange('curse', newValue)
    }

    const chargeOptionsCurse = () => {
        const optionsGrades = jsonData.grades.map((opt) => ({
            value: opt.id,
            label: opt.curso
        }))
        setOptCurse(optionsGrades)
    }

    useEffect(() => {
        setOptions()
        setIsDisabled(true)
    }, [])

    useEffect(() => {
        if (listOfData && contentModal && contentModal.aula) {
            const jsonClassroomFiltered = listOfData.classrooms.find((classroom) => { return classroom.codigo == contentModal.aula })
            console.log(jsonClassroomFiltered)
            const option: Option = {
                value: jsonClassroomFiltered?.id_curso.toString(),
                label: jsonClassroomFiltered?.codigo
            }
            selectOptionOfClassroom(option)
        }
    }, [listOfData])

    return (
        <div className='flex gap-2 mb-2 mt-8'>
            <CreatableSelect maxMenuHeight={140} value={studentInfo.classroom} onChange={(newValue: any) => selectOptionOfClassroom(newValue)} isDisabled={jsonIsCharged} onCreateOption={classroomCreated} className='w-[33%]' options={optClassroom} placeholder='Aula' noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} isSearchable styles={colourStylesBordered}></CreatableSelect>
            <Select maxMenuHeight={140} value={studentInfo.dependency} onChange={(newValue: any) => selectOptionOfDependency(newValue)} isClearable isDisabled={isDisabled} ref={selectDeps} className='w-[33%]' options={optDependency} placeholder='Dependencias' noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} isSearchable styles={colourStylesBordered}></Select>
            <Select maxMenuHeight={140} value={studentInfo.curse} onChange={(newValue: any) => selectOptionOfCurse(newValue)} isClearable isDisabled={isDisabled || curseDisabled} ref={selectCurse} className='w-[33%]' options={optCurse} placeholder='Curso' noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} isSearchable styles={colourStylesBordered}></Select>
        </div>
    )
}

export default ModalSelectsRegistrarIngreso