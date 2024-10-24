import React, { useEffect, useRef, useState } from 'react'
import Select, { SelectInstance } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { colourStylesBordered } from '@/helpers/selects';
import { GETFunction } from '@/utils/globals';
import {RangeValue} from "@react-types/shared";
import {parseDate} from "@internationalized/date";

interface IncomeRegisterOptionsClassrooms {
    aula: string
}

interface IClassroomCreated {
    curse: string
    dependency: string
    initDate: string
    finalDate: string
}

export interface Option {
    readonly label: string;
    readonly value: string;
}

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
}

const ModalSelectsRegistrarIngreso: React.FC<IModalSelectsRegistrarIngreso> = ({ setIsDisabled, isDisabled, valueClassroom, setValueClassroom, valueCurse, setValueCurse, valueDependency, setValueDependency, setValueDatePicker }) => {
    const [optClassroom, setOptClassroom] = useState<any>(undefined)
    const [optCurse, setOptCurse] = useState<any>(undefined)
    const [optDependency, setOptDependency] = useState<any>(undefined)
    
    const selectCurse = useRef(null)
    const selectDeps = useRef(null)

    const setOptionsClassroom = async () => {
        const jsonData = await GETFunction('incomeRegisterOptionsClassrooms') as Array<IncomeRegisterOptionsClassrooms>
        const options = jsonData.map((opt) => ({
            value: opt.aula,
            label: opt.aula
        }))
        setOptClassroom(options)
    }

    const createOption = (label: string) => ({
        label,
        value: label.toLowerCase().replace(/\W/g, ''),
    });

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

    const setOptionsCurse = async (setValue?: Array<IClassroomCreated>) => {
        // En realidad acá tendría q ir otro endpoint que cargue los cursos DEPENDIENDO del UserToken (Te da los que puede utilizar el usuario)
        const jsonData = await GETFunction('incomeRegisterOptionsClassrooms') as Array<IncomeRegisterOptionsClassrooms>
        const options = jsonData.map((opt) => ({
            value: opt.aula,
            label: opt.aula
        }))
        setOptCurse(options)

        if (setValue) {
            const options = setValue.map((opt) => ({
                value: opt.curse,
                label: opt.curse
            }))
            setValueCurse(options[0])
        }
    }

    const setOptionsDependency = async (setValue?: Array<IClassroomCreated>) => {
        // En realidad acá tendría q ir otro endpoint que cargue los cursos DEPENDIENDO del UserToken (Te da los que puede utilizar el usuario)
        const jsonData = await GETFunction('incomeRegisterOptionsClassrooms') as Array<IncomeRegisterOptionsClassrooms>
        const options = jsonData.map((opt) => ({
            value: opt.aula,
            label: opt.aula
        }))
        setOptDependency(options)

        if (setValue) {
            const options = setValue.map((opt) => ({
                value: opt.dependency,
                label: opt.dependency
            }))
            setValueDependency(options[0])
        }
    }

    const selectOptionOfClassroom = async (newValue: any) => {
        setValueClassroom(newValue)
        console.log(newValue)
        // Aca vendría un POST en el que mando el id del value y compruebo si ya esta cargado,
        // En caso de no estarlo, IsDisabled pasa a false, y ejecutará otra función con el userToken GET para recibir
        // las opciones que tiene disponible el usuario
        if (newValue.value == 'Z-101' || newValue.value == 'Z-102') {
            setIsDisabled(true)
            const jsonData = await GETFunction(`${newValue.value}`) as Array<IClassroomCreated>
            setOptionsCurse(jsonData)
            setOptionsDependency(jsonData)
            console.log(jsonData[0].initDate)
            setValueDatePicker({
                start: parseDate(jsonData[0].initDate),
                end: parseDate(jsonData[0].finalDate)
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
        // setIsDisabled(false)
        // En este else se ejecutan setOptions Curses y Dependency con un setValue, al existir este setValue,
        // La funcion, ejecutará otro GET en el que se pase el ID del classroom como parametro para obtener el curse, dependency y fechas
        // Y se hará un setValueCurse, setValueDependency y setValueDatePicker
    }

    useEffect(() => {
        setOptionsClassroom()
    }, [])

    return (
        <div className='flex gap-2 mb-2 mt-8'>
            <CreatableSelect maxMenuHeight={140} value={valueClassroom} onChange={(newValue) => selectOptionOfClassroom(newValue)} onCreateOption={classroomCreated} className='w-[170px]' options={optClassroom} placeholder='Aula' noOptionsMessage={({ inputValue }) => !inputValue ? 'No existe esa opción' : 'No existe esa opción'} isSearchable styles={colourStylesBordered}></CreatableSelect>
            <Select maxMenuHeight={140} value={valueDependency} onChange={(newValue: any) => setValueDependency(newValue)} isClearable isDisabled={isDisabled} ref={selectDeps} className='w-[170px]' options={optDependency} placeholder='Dependencias' noOptionsMessage={({ inputValue }) => !inputValue ? 'No existe esa opción' : 'No existe esa opción'} isSearchable styles={colourStylesBordered}></Select>
            <Select maxMenuHeight={140} value={valueCurse} onChange={(newValue: any) => setValueCurse(newValue)} isClearable isDisabled={isDisabled} ref={selectCurse} className='w-[170px]' options={optCurse} placeholder='Curso' noOptionsMessage={({ inputValue }) => !inputValue ? 'No existe esa opción' : 'No existe esa opción'} isSearchable styles={colourStylesBordered}></Select>
        </div>
    )
}

export default ModalSelectsRegistrarIngreso