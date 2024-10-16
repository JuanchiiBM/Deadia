import React, { useRef, useState } from 'react'
import Select from 'react-select';
import { colourStyles } from '@/helpers/selects';

interface ISelects {
    changeJson: (value: string) => void
    dataCurso: any
}

const Selects: React.FC<ISelects> = ({ changeJson, dataCurso }) => {
    const cursoSelect = useRef<any>(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isDisabled, setIsDisabled] = useState(true)
    const [optCursos, setOptCursos] = useState([])
    let optionsCursos

    const disabledCursos = (val: string) => {
        console.log(cursoSelect.current)
        if (cursoSelect.current && val != '0') {
            setIsDisabled(false)
            optionsCursos = dataCurso.map((opt: any, index: number) => {
                return {
                    value: index + 1,
                    label: `${opt.curso} | ${opt.aula}`
                };
            });
        
            setOptCursos(optionsCursos)
        }
        else if (cursoSelect.current) {
            setIsDisabled(true)
            setOptCursos([])
        }
    }

    const changeDependency = (e: any) => {
        disabledCursos(e.value)
        console.log(e)
        changeJson(e.value);
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
                <Select className='w-[170px]' placeholder='Dependencias' onChange={changeDependency} options={optionsDependencias} defaultValue={optionsDependencias[0]} isSearchable styles={colourStyles}></Select>
            </div>
            <div className='flex flex-col'>
                <label htmlFor="select-curso">Curso:</label>
                <Select className='w-[170px]' isDisabled={isDisabled} ref={cursoSelect} placeholder='Cursos' onChange={changeDependency} options={optCursos} defaultValue={optCursos[0]} isSearchable styles={colourStyles}></Select>
            </div>
        </div>
    )
}

export default Selects