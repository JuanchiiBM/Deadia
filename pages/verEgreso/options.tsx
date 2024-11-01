"use client"

import React, { useEffect, useRef, useState } from 'react'
import Select from 'react-select'
import { colourStyles } from '@/helpers/selects'
import { Option } from '@/utils/globals'
import OptionsVerEgresoDatePicker from './optionsDatePicker'

interface IOptionsVerEgreso {
    setValueCategory: React.Dispatch<React.SetStateAction<Option | null | undefined>>,
    valueCategory: Option | null | undefined
    setValueArticle: React.Dispatch<React.SetStateAction<Option | null | undefined>>,
    valueArticle: Option | null | undefined,
}

const OptionsVerEgreso: React.FC<any> = ({ setValueArticle, valueArticle, setValueCategory, valueCategory}) => {
    const [optCategory, setOptCategory] = useState<any>(undefined)
    const [optArticle, setOptArticle] = useState<any>(undefined)
    const [isDisabled, setIsDisabled] = useState<boolean>(true)
    const [isRequired, setIsRequired] = useState<boolean>(false)
    const dateRef = useRef()

    const selectCategory = (newValue: any) => {
        setValueCategory(newValue)

        switch (newValue.value) {
            case 'Militar':
                setIsDisabled(false)
                setIsRequired(true)
                break;
            default:
                setValueArticle(null)
                setIsDisabled(true)
                setIsRequired(false)
                break;
        }
    }

    return (
        <div className='w-full my-[50px] bg-background-200 h-[110px] flex justify-around p-5 rounded-lg shadow-md'>
            <div className='flex flex-col'>
                <label htmlFor="select-dependency">Categoría:</label>
                <Select className='w-[170px]' maxMenuHeight={200} value={valueCategory} onChange={(newValue: any) => selectCategory(newValue)} options={optCategory} placeholder='Categoría' noOptionsMessage={({ inputValue }) => !inputValue ? 'No existe esa opción' : 'No existe esa opción'} isSearchable styles={colourStyles} required></Select>
            </div>
            <OptionsVerEgresoDatePicker dateRef={dateRef} />
            <div className='flex flex-col'>
                <label htmlFor="select-dependency">Artículo:</label>
                <Select className='w-[170px]' maxMenuHeight={200} value={valueArticle} onChange={(newValue: any) => setValueArticle(newValue)} isDisabled={isDisabled} required={isRequired} options={optArticle} placeholder='Artículo' noOptionsMessage={({ inputValue }) => !inputValue ? 'No existe esa opción' : 'No existe esa opción'} isSearchable styles={colourStyles}></Select>
            </div>
        </div>
    )
}

export default OptionsVerEgreso