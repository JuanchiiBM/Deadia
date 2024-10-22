import React, { useEffect, useRef, useState } from 'react'
import Select, { SelectInstance } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { colourStylesBordered } from '@/helpers/selects';
import { GETFunction } from '@/utils/globals';

interface IncomeRegisterOptionsClassrooms {
    aula: string
}

interface Option {
    readonly label: string;
    readonly value: string;
}

const ModalSelectsRegistrarIngreso = () => {
    const [optClassroom, setOptClassroom] = useState<any>(undefined)
    const [value, setValue] = useState<Option | null>();
    const [isDisabled, setIsDisabled] = useState(true)
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
        setValue(newOption);
    }

    const selectOptionOfClassroom = (newValue: any) => {
        setValue(newValue)

        // Aca vendría un POST en el que mando el id del value y compruebo si ya esta cargado,
        // En caso de no estarlo, IsDisabled pasa a false, y ejecutará otra función con el userToken GET para recibir
        // las opciones que tiene disponible el usuario, si no, pasa a un else donde cargo los valores de los selects
        // setIsDisabled(false)


    }

    useEffect(() => {
        setOptionsClassroom()
    }, [])

    return (
        <div className='flex gap-2 mb-2 mt-8'>
            <CreatableSelect value={value} onChange={(newValue) => selectOptionOfClassroom(newValue)} onCreateOption={classroomCreated} className='w-[170px]' options={optClassroom} placeholder='Aula' noOptionsMessage={({ inputValue }) => !inputValue ? 'No existe esa opción' : 'No existe esa opción'} isSearchable styles={colourStylesBordered}></CreatableSelect>
            <Select isClearable isDisabled={isDisabled} ref={selectCurse} className='w-[170px]' placeholder='Curso' noOptionsMessage={({ inputValue }) => !inputValue ? 'No existe esa opción' : 'No existe esa opción'} isSearchable styles={colourStylesBordered}></Select>
            <Select isClearable isDisabled={isDisabled} ref={selectDeps} className='w-[170px]' placeholder='Dependencias' noOptionsMessage={({ inputValue }) => !inputValue ? 'No existe esa opción' : 'No existe esa opción'} isSearchable styles={colourStylesBordered}></Select>
        </div>
    )
}

export default ModalSelectsRegistrarIngreso