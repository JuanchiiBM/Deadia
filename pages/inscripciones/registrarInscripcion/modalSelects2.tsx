import React from 'react'
import Select from 'react-select';
import { colourStylesBordered } from '@/helpers/selects';
import { Input } from '@nextui-org/react';
import { IModalSelects2Inscription } from '@/helpers/interfaces';
import { useSelectOptionsInscription2 } from '@/hooks/inscripciones/registrarInscripcion/useSelectOptionsInscription';
import { useChargeSelect2 } from '@/hooks/inscripciones/registrarInscripcion/useChargeSelect';

const ModalSelectsRegistrarIngreso2: React.FC<IModalSelects2Inscription> = ({ jsonData, studentInfo, handleInputChange, isOpen, isLoadingDni }) => {
    const { options, isDisabled, selectCategory } = useSelectOptionsInscription2({ jsonData, isOpen, handleInputChange })
    const {} = useChargeSelect2({ studentInfo, jsonData, selectCategory, handleInputChange})

    return (
        <>
            <div className='flex gap-2 mb-2 mt-8'>
                <Select maxMenuHeight={200} value={studentInfo?.category} onChange={(newValue: any) => selectCategory(newValue)} className='w-[50%]' isDisabled={isLoadingDni} options={options.category} placeholder='Categoría' noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} isSearchable styles={colourStylesBordered} required></Select>
                <Select maxMenuHeight={200} value={studentInfo?.grade} onChange={(newValue: any) => handleInputChange('grade', newValue)} isDisabled={isDisabled || isLoadingDni} required={!isDisabled} className='w-[50%]' options={options.grade} placeholder='Grado' noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} isSearchable styles={colourStylesBordered}></Select>
            </div>
            <div className="flex">
                <Input variant='bordered' labelPlacement='outside' label='Destino' isDisabled={isDisabled || isLoadingDni} required={!isDisabled} />
            </div>
        </>
    )
}

export default ModalSelectsRegistrarIngreso2