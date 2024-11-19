import React from 'react'
import Select from 'react-select';
import { colourStylesBordered } from '@/helpers/selects';
import { IModalSelects2Inscription } from '@/helpers/interfaces';
import { useSelectOptionsInscription2 } from '@/hooks/useSelectOptionsInscription';

const ModalSelectsRegistrarIngreso2: React.FC<IModalSelects2Inscription> = ({ jsonData, studentInfo, handleInputChange, isOpen }) => {
    const {options, isDisabled, selectCategory} = useSelectOptionsInscription2({jsonData: jsonData, isOpen: isOpen, handleInputChange: handleInputChange})

    return (
        <div className='flex gap-2 mb-2 mt-8'>
            <Select maxMenuHeight={200} value={studentInfo?.category} onChange={(newValue: any) => selectCategory(newValue)} className='w-[50%]' options={options.category} placeholder='Categoría' noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} isSearchable styles={colourStylesBordered} required></Select>
            <Select maxMenuHeight={200} value={studentInfo?.grade} onChange={(newValue: any) => handleInputChange('grade', newValue)} isDisabled={isDisabled} required={!isDisabled} className='w-[50%]' options={options.grade} placeholder='Grado' noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} isSearchable styles={colourStylesBordered}></Select>
        </div>
    )
}

export default ModalSelectsRegistrarIngreso2