import React from 'react'
import Select, { SelectInstance } from 'react-select';
import { colourStylesBordered } from '@/helpers/selects';

const ModalSelectsRegistrarIngreso = () => {
    return (
        <div className='flex gap-2 mb-2 mt-8'>
            <Select className='w-[170px]' placeholder='Aula' noOptionsMessage={({ inputValue }) => !inputValue ? 'No existe esa opción' : 'No existe esa opción'} isSearchable styles={colourStylesBordered}></Select>
            <Select className='w-[170px]' placeholder='Curso' noOptionsMessage={({ inputValue }) => !inputValue ? 'No existe esa opción' : 'No existe esa opción'} isSearchable styles={colourStylesBordered}></Select>
            <Select className='w-[170px]' placeholder='Dependencias' noOptionsMessage={({ inputValue }) => !inputValue ? 'No existe esa opción' : 'No existe esa opción'} isSearchable styles={colourStylesBordered}></Select>
        </div>
    )
}

export default ModalSelectsRegistrarIngreso