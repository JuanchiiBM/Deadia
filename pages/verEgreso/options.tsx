"use client"

import React, { useEffect, useRef, useState } from 'react'
import Select from 'react-select'
import { colourStyles } from '@/helpers/selects'
import { Option, GETFunction } from '@/utils/globals'
import OptionsVerEgresoDatePicker from './optionsDatePicker'

interface IUserCategory {
    name: string
}

interface IUserArticle {
    category: string,
    article: string,
}

interface IOptionsVerEgreso {
    setValueCategory: React.Dispatch<React.SetStateAction<Option | null | undefined>>,
    valueCategory: Option | null | undefined
    setValueArticle: React.Dispatch<React.SetStateAction<Option | null | undefined>>,
    valueArticle: Option | null | undefined,
}

const OptionsVerEgreso: React.FC<IOptionsVerEgreso> = ({ setValueArticle, valueArticle, setValueCategory, valueCategory }) => {
    const [optCategory, setOptCategory] = useState<any>(undefined)
    const [optArticle, setOptArticle] = useState<any>(undefined)
    const [isDisabled, setIsDisabled] = useState<boolean>(true)
    const [isRequired, setIsRequired] = useState<boolean>(false)
    const dateRef = useRef()

    const chargeCategory = async () => {
        const jsonData = await GETFunction('egressCategory') as Array<IUserCategory>
        const optionsCategory = jsonData.map((category) => ({
            value: category.name,
            label: category.name
        }))
        setOptCategory(optionsCategory)
    }

    const chargeArticle = async (category: string) => {
        const jsonData = await GETFunction('egressArticle') as Array<IUserArticle>
        const optionsArticle = jsonData.filter((article) => { return article.category == category && article }).map((article) => ({
            value: article.article,
            label: article.article
        }))
        setOptArticle(optionsArticle)
    }
    const selectCategory = (newValue: any) => {
        setValueCategory(newValue)
        switch (newValue.value) {
            case 'Todas':
                setValueArticle(null)
                setIsDisabled(true)
                setIsRequired(false)
                break;
            default:
                setValueArticle(null)
                setIsDisabled(false)
                setIsRequired(true)
                chargeArticle(newValue.value)
                break;
        }
    }

    useEffect(() => {
        chargeCategory()
    }, [])

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