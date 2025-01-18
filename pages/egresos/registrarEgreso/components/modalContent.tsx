import React from 'react'
import { Option } from '@/utils/globals';
import { colourStylesBordered } from '@/styles/selects';
import { useContextRegister } from '@/context/contextRegister'
import CreatableSelect from 'react-select/creatable';
import { Input, DatePicker } from "@heroui/react"
import { I18nProvider } from "@react-aria/i18n";
import { getLocalTimeZone, today } from "@internationalized/date";
import { useSelectHandleChange, useSelectOptions } from '../hooks/useSelectOptions';
import { dateRangePickerStyles } from '@/styles/dateRangePickerStyles';


const ModalContent = () => {
    const { dataForm, handleInputChange } = useContextRegister()
    const { options, jsonData, isLoading, chargueNewCategory, chargueNewLicitation, chargueNewArticle, chargueOptionsArticle } = useSelectOptions()
    const { selectOptionOfCategory, categoryCreated, articleCreated, licitationCreated, isDisabled } = useSelectHandleChange({ jsonData, handleInputChange, chargueNewCategory, chargueNewArticle, chargueOptionsArticle, chargueNewLicitation })

    return (
        <>
            <div className='flex gap-2 mb-2'>
                <CreatableSelect maxMenuHeight={140} value={dataForm.category} onCreateOption={categoryCreated} onChange={(newValue: any) => selectOptionOfCategory(newValue)} options={options.category} isDisabled={isLoading} className='w-[50%]' placeholder='Categoría' noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} isSearchable styles={colourStylesBordered}></CreatableSelect>
                <CreatableSelect maxMenuHeight={140} value={dataForm.article} onCreateOption={articleCreated} onChange={(newValue: any) => handleInputChange('article', newValue)} options={options.article} isDisabled={isDisabled} className='w-[50%]' placeholder='Articulo' noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} isSearchable styles={colourStylesBordered}></CreatableSelect>
            </div>
            <div className='w-full m-0 flex gap-2'>
                <I18nProvider locale='es-ES'>
                    <DatePicker label="Fecha de Compra" value={dataForm.datePicker} onChange={(e) => { handleInputChange('datePicker', e) }} maxValue={today(getLocalTimeZone())} showMonthAndYearPickers labelPlacement='outside' variant='bordered' {...dateRangePickerStyles} />
                </I18nProvider>
                {/*
                <I18nProvider locale='es-ES'>
                    <DatePicker label="Fecha de Vencimiento" value={dataForm.datePickerVencimiento} onChange={(e) => { handleInputChange('datePickerVencimiento', e) }} showMonthAndYearPickers labelPlacement='outside' variant='bordered' {...dateRangePickerStyles} />
                </I18nProvider>
                */}
            </div>
            <div className='w-full mt-3 flex gap-2'>
                <Input variant='bordered' value={dataForm.amount ? dataForm.amount : ''} onChange={(e) => { handleInputChange('amount', e.currentTarget.value) }} placeholder='---' label='Cantidad' labelPlacement='outside' classNames={{ mainWrapper: 'flex justify-end' }} required />
                <Input variant='bordered' value={dataForm.price ? dataForm.price : ''} onChange={(e) => { handleInputChange('price', e.currentTarget.value) }} placeholder='$' label='Monto' labelPlacement='outside' classNames={{ mainWrapper: 'flex justify-end' }} required />
            </div>
            <div className='w-full mt-3 flex gap-2'>
                <CreatableSelect maxMenuHeight={140} value={dataForm.licitation} onCreateOption={licitationCreated} onChange={(newValue: any) => handleInputChange('licitation', newValue)} options={options.bidding} isDisabled={isLoading} className='w-[50%] mt-6' placeholder='Nro. Licitacion' noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} isSearchable styles={colourStylesBordered}></CreatableSelect>
                <Input variant='bordered' value={dataForm.nro_renglon ? dataForm.nro_renglon : ''} onChange={(e) => { handleInputChange('nro_renglon', e.currentTarget.value) }} placeholder='---' label='Nro. Renglon' labelPlacement='outside' className='w-[50%]' classNames={{ mainWrapper: 'flex justify-end' }} required />
            </div>
            <div className='w-full mt-3 flex gap-2'>
                <Input variant='bordered' value={dataForm.description ? dataForm.description : ''} onChange={(e) => { handleInputChange('description', e.currentTarget.value) }} placeholder=' ' label='Descripción' labelPlacement='outside' classNames={{ mainWrapper: 'flex justify-end' }} required />
            </div>
        </>
    )
}

export default ModalContent
