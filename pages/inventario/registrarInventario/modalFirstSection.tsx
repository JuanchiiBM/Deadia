import React from 'react'
import Select from 'react-select';
import { colourStylesBordered } from '@/helpers/selects';
import { IUseFormInventoryRegister } from '@/helpers/interfaces';
import { RangeValue, CalendarDate, Input } from '@nextui-org/react';
import { Option } from '@/utils/globals';
import { useSelectHandleChange, useSelectOptions } from '@/hooks/inventario/registrarInventario/useSelectOptions';

interface IModalFisrtSection {
    dataForm: IUseFormInventoryRegister
    handleInputChange: (field: string, value: string | RangeValue<any> | CalendarDate | undefined | Option | null) => void
    jsonDataArticles: any
    isLoadingArticles: boolean
}

const ModalFisrtSection: React.FC<IModalFisrtSection> = ({ dataForm, handleInputChange, jsonDataArticles, isLoadingArticles }) => {
    const {options, jsonData, isLoading, chargueOptionsArticle} = useSelectOptions()
    const {selectOptionOfCategory, isDisabled} = useSelectHandleChange({jsonData, handleInputChange, chargueOptionsArticle})    

    return (
        <>
            <div className='flex gap-2 mb-2'>
                <Select maxMenuHeight={140} value={dataForm.category} onChange={(newValue: any) => selectOptionOfCategory(newValue)} options={options.category} isDisabled={isLoading} className='w-[50%]' placeholder='Categoría' noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} isSearchable styles={colourStylesBordered} required></Select>
                <Select maxMenuHeight={140} value={dataForm.article} onChange={(newValue: any) => handleInputChange('article', newValue)} options={options.article} isDisabled={isDisabled}  className='w-[50%]' placeholder='Articulo' noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} isSearchable styles={colourStylesBordered} required></Select>
            </div>
            <div className='flex justify-end gap-2 my-2 w-full'>
                <Select maxMenuHeight={140} value={dataForm.section} onChange={(newValue: any) => handleInputChange('section', newValue)} options={options.deps} isDisabled={isLoading} styles={colourStylesBordered} className='w-[50%] self-end' placeholder='Sector' noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} isSearchable required></Select>
                <Input type='number' value={dataForm.action || ''} onChange={(newValue: any) => handleInputChange('action', newValue.currentTarget.value)} max={jsonDataArticles && jsonDataArticles.saldo_restante} min={jsonDataArticles && `-${jsonDataArticles.saldo}`} variant='bordered' label='Acción' isDisabled={(jsonDataArticles && !isLoadingArticles) ? false : true} labelPlacement='outside' className='w-[50%]' classNames={{ mainWrapper: 'flex justify-end', helperWrapper: 'absolute bottom-[-23px]' }} required />            
            </div>
        </>
    )
}

export default ModalFisrtSection