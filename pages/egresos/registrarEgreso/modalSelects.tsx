import React, { useEffect, useRef, useState } from 'react'
import Select, { SelectInstance } from 'react-select';
import { colourStylesBordered } from '@/helpers/selects';
import { GETFunctionFake, Option } from '@/utils/globals';

interface ITypes {
    idType: string
    name: string
}

interface IArticles {
    idArticle: string
    name: string
}


interface IModalSelectsEgresos {
    setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>,
    isDisabled: boolean,
    setValueType: React.Dispatch<React.SetStateAction<Option | null | undefined>>,
    valueType: Option | null | undefined,
    setValueArticle: React.Dispatch<React.SetStateAction<Option | null | undefined>>,
    valueArticle: Option | null | undefined
}

const ModalSelectsEgresos: React.FC<IModalSelectsEgresos> = ({ isDisabled, setIsDisabled, setValueType, setValueArticle, valueType, valueArticle}) => {
    const [optTypes, setOptTypes] = useState<any>(undefined)
    const [optArticles, setOptArticles] = useState<any>(undefined)

    const setOptionsTypes = async () => {
        const jsonData = await GETFunctionFake('type') as Array<ITypes>
        const options = jsonData.map((opt) => ({
            value: opt.idType,
            label: opt.name
        }))
        setOptTypes(options)
    }

    const setValueTypeAndDisabledArticle = async (value: any) => {
        setValueType(value)
        if (value == null) {
            setIsDisabled(true) 
        } else {
            //Aca dependiendo del valor se pasa por parametro en el head y me devuelve los de ese tipo
            const jsonData = await GETFunctionFake('article') as Array<IArticles>
            const options = jsonData.map((opt) => ({
                value: opt.idArticle,
                label: opt.name
            }))
            setOptArticles(options)
            setIsDisabled(false)
        }
    }

    useEffect(() => {
        setOptionsTypes()
    }, [])

    return (
        <div className='flex gap-2 mb-2'>
            <Select maxMenuHeight={140} value={valueType} onChange={(newValue: any) => setValueTypeAndDisabledArticle(newValue)} options={optTypes} isClearable className='w-[50%]' placeholder='Categoría' noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} isSearchable styles={colourStylesBordered}></Select>
            <Select maxMenuHeight={140} value={valueArticle} onChange={(newValue: any) => setValueArticle(newValue)} options={optArticles} isDisabled={isDisabled} isClearable className='w-[50%]' placeholder='Articulo' noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} isSearchable styles={colourStylesBordered}></Select>
        </div>
    )
}

export default ModalSelectsEgresos