import React, { useEffect, useRef, useState } from 'react'
import Select, { SelectInstance } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { colourStylesBordered } from '@/helpers/selects';
import { GETFunction, GETFunction2, createOption, Option, formatDate } from '@/utils/globals';
import { RangeValue } from "@react-types/shared";
import { parseDate } from "@internationalized/date";

interface IncomeRegisterOptionsClassrooms {
    classrooms: [
        IncomeRegisterOptionClassroom
    ]
}

interface IncomeRegisterOptionClassroom {
    curso: string
    dependencia: string
    fec_finalizacion: string
    fec_inicio: string
    id: number
}

interface IClassroomCreated {
    curse: string
    dependency: string
    initDate: string
    finalDate: string
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
    contentModal: any
}

const ModalSelectsRegistrarIngreso: React.FC<IModalSelectsRegistrarIngreso> = ({ contentModal, setIsDisabled, isDisabled, valueClassroom, setValueClassroom, valueCurse, setValueCurse, valueDependency, setValueDependency, setValueDatePicker }) => {
    const [optClassroom, setOptClassroom] = useState<any>(undefined)
    const [listOfClassrooms, setListOfClassrooms] = useState<IncomeRegisterOptionsClassrooms | undefined>(undefined)
    const [optCurse, setOptCurse] = useState<any>(undefined)
    const [optDependency, setOptDependency] = useState<any>(undefined)

    const selectCurse = useRef(null)
    const selectDeps = useRef(null)

    const setOptionsClassroom = async () => {
        const jsonData = await GETFunction2('api/income/register/form') as IncomeRegisterOptionsClassrooms
        setListOfClassrooms(jsonData)
        const options = jsonData.classrooms.map((opt) => ({
            value: opt.id,
            label: opt.id
        }))
        setOptClassroom(options)
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
        // En realidad acá tendría q ir otro endpoint que cargue los cursos DEPENDIENDO del UserToken (Te da los que puede utilizar el usuario)
        /*const jsonData = await GETFunction('incomeRegisterOptionsClassrooms') as Array<IncomeRegisterOptionsClassrooms>
        const options = jsonData.map((opt) => ({
            value: opt.aula,
            label: opt.aula
        }))
        setOptDependency(options)*/

        if (setValue) {
            const options = [{label: setValue, value: setValue}]
            setValueDependency(options[0])
        }
    }

    const selectOptionOfClassroom = async (newValue: any) => {
        setValueClassroom(newValue)
        // Aca vendría un POST en el que mando el id del value y compruebo si ya esta cargado,
        // En caso de no estarlo, IsDisabled pasa a false, y ejecutará otra función con el userToken GET para recibir
        // las opciones que tiene disponible el usuario
        if (listOfClassrooms?.classrooms.some((opt: IncomeRegisterOptionClassroom) => opt.id == newValue.value)) {
            setIsDisabled(true)
            listOfClassrooms.classrooms.forEach((opt: IncomeRegisterOptionClassroom) => {
                if (opt.id == newValue.value) {
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
        // setIsDisabled(false)
        // En este else se ejecutan setOptions Curses y Dependency con un setValue, al existir este setValue,
        // La funcion, ejecutará otro GET en el que se pase el ID del classroom como parametro para obtener el curse, dependency y fechas
        // Y se hará un setValueCurse, setValueDependency y setValueDatePicker
    }

    useEffect(() => {
        setOptionsClassroom()
    }, [])

    useEffect(() => {
        if (contentModal && contentModal.aula) {
            const option = {
                value: contentModal.aula,
                label: contentModal.aula
            }
            selectOptionOfClassroom(option)
        }
    }, [contentModal])

    return (
        <div className='flex gap-2 mb-2 mt-8'>
            <CreatableSelect maxMenuHeight={140} value={valueClassroom} onChange={(newValue) => selectOptionOfClassroom(newValue)} onCreateOption={classroomCreated} className='w-[33%]' options={optClassroom} placeholder='Aula' noOptionsMessage={({ inputValue }) => !inputValue ? 'No existe esa opción' : 'No existe esa opción'} isSearchable styles={colourStylesBordered}></CreatableSelect>
            <Select maxMenuHeight={140} value={valueDependency} onChange={(newValue: any) => setValueDependency(newValue)} isClearable isDisabled={isDisabled} ref={selectDeps} className='w-[33%]' options={optDependency} placeholder='Dependencias' noOptionsMessage={({ inputValue }) => !inputValue ? 'No existe esa opción' : 'No existe esa opción'} isSearchable styles={colourStylesBordered}></Select>
            <Select maxMenuHeight={140} value={valueCurse} onChange={(newValue: any) => setValueCurse(newValue)} isClearable isDisabled={isDisabled} ref={selectCurse} className='w-[33%]' options={optCurse} placeholder='Curso' noOptionsMessage={({ inputValue }) => !inputValue ? 'No existe esa opción' : 'No existe esa opción'} isSearchable styles={colourStylesBordered}></Select>
        </div>
    )
}

export default ModalSelectsRegistrarIngreso