import React, { useEffect, useRef, useState } from 'react'
import Select, { SelectInstance } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { colourStylesBordered } from '@/helpers/selects';
import { GETFunction, createOption, Option, formatDate } from '@/utils/globals';
import { RangeValue } from "@react-types/shared";
import { parseDate } from "@internationalized/date";
import { IncomeRegisterOptions, IncomeRegisterOptionClassroom, IncomeRegisterOptionDep, IncomeRegisterOptionGrade } from './modal';



interface IModalSelectsRegistrarIngreso {
    setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>,
    isDisabled: boolean,
    setValueClassroom: React.Dispatch<React.SetStateAction<Option | null | undefined>>,
    valueClassroom: Option | null | undefined,
    setValueCurse: React.Dispatch<React.SetStateAction<Option | null | undefined>>,
    valueCurse: Option | null | undefined,
    setValueDependency: React.Dispatch<React.SetStateAction<Option | null | undefined>>,
    valueDependency: Option | null | undefined
    setValueDatePicker: React.Dispatch<React.SetStateAction<RangeValue<any>>>
    contentModal: any
    jsonIsCharged: boolean
    jsonData: IncomeRegisterOptions
}

const ModalSelectsRegistrarIngreso: React.FC<IModalSelectsRegistrarIngreso> = ({ jsonIsCharged, jsonData, contentModal, setIsDisabled, isDisabled, valueClassroom, setValueClassroom, valueCurse, setValueCurse, valueDependency, setValueDependency, setValueDatePicker }) => {
    const [optClassroom, setOptClassroom] = useState<any>(undefined)
    const [listOfData, setListOfData] = useState<IncomeRegisterOptions | undefined>(undefined)
    const [optCurse, setOptCurse] = useState<any>(undefined)
    const [curseDisabled, setCurseDisabled] = useState<boolean>(true)
    const [optDependency, setOptDependency] = useState<any>(undefined)
    const selectCurse = useRef(null)
    const selectDeps = useRef(null)

    const setOptions = async () => {
        setListOfData(jsonData)
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
        setValueClassroom(newOption);
        setValueCurse(null)
        setValueDependency(null)
        setValueDatePicker({
            start: null,
            end: null
        })
        setIsDisabled(false)
        setOptionsCurse()
        setOptionsDependency()
    }

    const setOptionsCurse = async (setValue?: string) => {
        if (setValue) {
            const options = [{label: setValue, value: setValue}]
            setValueCurse(options[0])
        }
    }

    const setOptionsDependency = async (setValue?: string) => {
        if (setValue) {
            const options = [{label: setValue, value: setValue}]
            setValueDependency(options[0])
        }
    }

    const selectOptionOfClassroom = async (newValue: any) => {
        setValueClassroom(newValue)
        console.log(listOfData?.classrooms.some((opt: IncomeRegisterOptionClassroom) => opt.id_curso == newValue.value))
        if (listOfData?.classrooms.some((opt: IncomeRegisterOptionClassroom) => opt.id_curso == newValue.value)) {
            setIsDisabled(true)
            listOfData.classrooms.forEach((opt: IncomeRegisterOptionClassroom) => {
                if (opt.id_curso == newValue.value) {
    
                    setOptionsCurse(opt.curso)
                    setOptionsDependency(opt.dependencia)
                    setValueDatePicker({
                        start: parseDate(formatDate(opt.fec_inicio)),
                        end: parseDate(formatDate(opt.fec_finalizacion))
                    })
                }
            })
        } else {
            setIsDisabled(false)
            setValueCurse(null)
            setValueDependency(null)
            setValueDatePicker({
                start: null,
                end: null
            })
        }
    }

    const selectOptionOfDependency = (newValue: any) => {
        setValueDependency(newValue)
        newValue != null ? setCurseDisabled(false) : setCurseDisabled(true)
        chargeOptionsCurse() 
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
            const jsonClassroomFiltered = listOfData.classrooms.find((classroom) => {return classroom.codigo == contentModal.aula})
            console.log(jsonClassroomFiltered)
            const option = {
                value: jsonClassroomFiltered?.id_curso,
                label: jsonClassroomFiltered?.codigo
            }
            selectOptionOfClassroom(option)
        }
    }, [listOfData])

    return (
        <div className='flex gap-2 mb-2 mt-8'>
            <CreatableSelect maxMenuHeight={140} value={valueClassroom} onChange={(newValue) => selectOptionOfClassroom(newValue)} isDisabled={jsonIsCharged} onCreateOption={classroomCreated} className='w-[33%]' options={optClassroom} placeholder='Aula' noOptionsMessage={({ inputValue }) => !inputValue ? 'No existe esa opción' : 'No existe esa opción'} isSearchable styles={colourStylesBordered}></CreatableSelect>
            <Select maxMenuHeight={140} value={valueDependency} onChange={(newValue: any) => selectOptionOfDependency(newValue)} isClearable isDisabled={isDisabled} ref={selectDeps} className='w-[33%]' options={optDependency} placeholder='Dependencias' noOptionsMessage={({ inputValue }) => !inputValue ? 'No existe esa opción' : 'No existe esa opción'} isSearchable styles={colourStylesBordered}></Select>
            <Select maxMenuHeight={140} value={valueCurse} onChange={(newValue: any) => setValueCurse(newValue)} isClearable isDisabled={isDisabled || curseDisabled} ref={selectCurse} className='w-[33%]' options={optCurse} placeholder='Curso' noOptionsMessage={({ inputValue }) => !inputValue ? 'No existe esa opción' : 'No existe esa opción'} isSearchable styles={colourStylesBordered}></Select>
        </div>
    )
}

export default ModalSelectsRegistrarIngreso