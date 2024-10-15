import React, { useRef } from 'react'

interface ISelects {
    changeJson: (value: string) => void
}

const Selects: React.FC<ISelects> = ({ changeJson }) => {
    const cursoSelect = useRef<HTMLSelectElement>(null);

    const disabledCursos = (select: HTMLSelectElement) => {
        if (cursoSelect.current && select.value != '0')
            cursoSelect.current.disabled = false
        else if (cursoSelect.current) {
            cursoSelect.current.disabled = true
        }
    }

    const changeDependency = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const select = e.target
        disabledCursos(select)
        changeJson(select.value);
    }

    return (
        <div className='w-full my-[50px] bg-background-200 flex justify-around p-5 rounded-lg shadow-md'>
            <div className='flex flex-col'>
                <label htmlFor="select-dependency">Dependencia:</label>
                <select name="" onChange={(e) => changeDependency(e)} id="select-dependency" className='w-[170px] rounded-md bg-background p-1 outline-none'>
                    <option value="0">Seleccione</option>
                    <option value="1">Informatica</option>
                    <option value="2">Idiomas</option>
                </select>
            </div>
            <div className='flex flex-col'>
                <label htmlFor="select-curso">Curso:</label>
                <select name="" id="select-curso" ref={cursoSelect} disabled className='w-[170px] rounded-md bg-background p-1 outline-none'>
                    <option value="0">Seleccione</option>
                    <option value="1">2</option>
                </select>
            </div>
        </div>
    )
}

export default Selects