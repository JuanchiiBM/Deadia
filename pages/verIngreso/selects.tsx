import React, { useRef, useState } from 'react'
import Select, { SelectInstance } from 'react-select';
import { colourStyles } from '@/helpers/selects';

interface ISelects {
    changeJson: (value: string, ret?: boolean) => void
    changeJsonForCurse: (value: string) => void
}

const Selects: React.FC<ISelects> = ({ changeJson, changeJsonForCurse }) => {
    const cursoSelect = useRef<SelectInstance<any> | null>(null);
    const depSelect = useRef<SelectInstance<any> | null>(null);
    const [isDisabled, setIsDisabled] = useState(true)
    const [optCursos, setOptCursos] = useState([])
    let optionsCursos

    const disabledCursos = (val: string, data: any) => {
        if (cursoSelect.current && val != '0') {
            setIsDisabled(false)
            optionsCursos = data.map((opt: any, index: number) => {
                return {
                    value: index + 1,
                    type: 'curso',
                    label: `${opt.curso} | ${opt.aula}`
                };
            });
            cursoSelect.current.setValue('0', 'select-option')
            setOptCursos(optionsCursos)
        }
        else if (cursoSelect.current) {
            cursoSelect.current.setValue('0', 'select-option')
            setIsDisabled(true)
        }
    }

    const changeDependency = async (e: any) => {
        if (e.value != undefined) {
            const data = await changeJson(e.value, true)
            disabledCursos(e.value, data)
        }
    }

 
    const changeCurse = async (e: any) => {        
        if (e.value != undefined) {
            const data = await changeJsonForCurse(e.value)
        }
    }
   
    const optionsDependencias = [
        { value: '0', label: 'Todas' },
        { value: '1', label: 'Informatica' },
        { value: '2', label: 'Idiomas' },
    ]
    return (
        <div className='w-full my-[50px] bg-background-200 flex justify-around p-5 rounded-lg shadow-md'>
            <div className='flex flex-col'>
                <label htmlFor="select-dependency">Dependencia:</label>
                <Select className='w-[170px]' placeholder='Dependencias' ref={depSelect} noOptionsMessage={({inputValue}) => !inputValue ? 'No existe esa opción' : 'No existe esa opción'}  onChange={changeDependency} options={optionsDependencias} defaultValue={optionsDependencias[0]} isSearchable styles={colourStyles}></Select>
            </div>
            <div className='flex flex-col'>
                <label htmlFor="select-curso">Curso:</label>
                <Select className='w-[170px]' isDisabled={isDisabled} ref={cursoSelect} placeholder='Cursos' noOptionsMessage={({inputValue}) => !inputValue ? 'No existe esa opción' : 'No existe esa opción'} onChange={changeCurse} options={optCursos} defaultValue={optCursos[0]} isSearchable styles={colourStyles}></Select>
            </div>
        </div>
    )
}

export default Selects