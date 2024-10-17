import React, { useRef, useState } from 'react'
import AsyncSelect, { SelectInstance } from 'react-select';
import { colourStyles } from '@/helpers/selects';

interface ISelects {
    changeJson: (value: string, ret?: boolean) => void
}

const Selects: React.FC<ISelects> = ({ changeJson }) => {
    const cursoSelect = useRef<SelectInstance<any> | null>(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isDisabled, setIsDisabled] = useState(true)
    const [optCursos, setOptCursos] = useState([])
    let optionsCursos

    const disabledCursos = (val: string, data: any) => {
        if (cursoSelect.current && val != '0') {
            setIsDisabled(false)
            optionsCursos = data.map((opt: any, index: number) => {
                return {
                    value: index + 1,
                    label: `${opt.curso} | ${opt.aula}`
                };
            });
            setOptCursos(optionsCursos)
        }
        else if (cursoSelect.current) {
            cursoSelect.current.setValue('0', 'select-option')
            setIsDisabled(true)
        }
    }

    const changeDependency = async (e: any) => {
        const data = await changeJson(e.value, true)
        console.log(e.value)
        disabledCursos(e.value, data,)
    }

    const optionsDependencias = [
        { value: '0', label: 'Seleccione' },
        { value: '1', label: 'Informatica' },
        { value: '2', label: 'Idiomas' },
    ]
    return (
        <div className='w-full my-[50px] bg-background-200 flex justify-around p-5 rounded-lg shadow-md'>
            <div className='flex flex-col'>
                <label htmlFor="select-dependency">Dependencia:</label>
                <AsyncSelect className='w-[170px]' placeholder='Dependencias' onChange={changeDependency} options={optionsDependencias} defaultValue={optionsDependencias[0]} isSearchable styles={colourStyles}></AsyncSelect>
            </div>
            <div className='flex flex-col'>
                <label htmlFor="select-curso">Curso:</label>
                <AsyncSelect className='w-[170px]' isDisabled={isDisabled} ref={cursoSelect} placeholder='Cursos' onChange={changeDependency} options={optCursos} defaultValue={optCursos[0]} isSearchable styles={colourStyles}></AsyncSelect>
            </div>
        </div>
    )
}

export default Selects