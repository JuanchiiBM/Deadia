import React from 'react'
import Select from 'react-select/creatable';
import { colourStylesBordered } from '@/helpers/selects';
import { IUseFormInventoryRegister } from '@/helpers/interfaces';
import { RangeValue, CalendarDate } from '@nextui-org/react';
import { Option } from '@/utils/globals';
import { useSelectHandleChange, useSelectOptions } from '@/hooks/inventario/registrarInventario/useSelectOptions';

interface IModalFisrtSection {
    dataForm: IUseFormInventoryRegister
    handleInputChange: (field: string, value: string | RangeValue<any> | CalendarDate | undefined | Option | null) => void
}

const ModalFisrtSection: React.FC<IModalFisrtSection> = ({ dataForm, handleInputChange }) => {
    const {options, jsonData, isLoading, chargueNewCategory, chargueNewArticle, chargueOptionsArticle} = useSelectOptions()
    const {selectOptionOfCategory, categoryCreated, articleCreated, isDisabled} = useSelectHandleChange({jsonData, handleInputChange, chargueNewCategory, chargueNewArticle, chargueOptionsArticle})

    return (
        <div className='flex gap-2 mb-2'>
            <Select maxMenuHeight={140} value={dataForm.category} onCreateOption={categoryCreated} onChange={(newValue: any) => selectOptionOfCategory(newValue)} options={options.category} isDisabled={isLoading} className='w-[50%]' placeholder='Categoría' noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} isSearchable styles={colourStylesBordered}></Select>
            <Select maxMenuHeight={140} value={dataForm.article} onCreateOption={articleCreated} onChange={(newValue: any) => handleInputChange('article', newValue)} options={options.article} isDisabled={isDisabled}  className='w-[50%]' placeholder='Articulo' noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} isSearchable styles={colourStylesBordered}></Select>
        </div>
    )
}

export default ModalFisrtSection