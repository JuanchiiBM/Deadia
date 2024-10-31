import React, { useEffect, useState } from 'react'
import Select, { SelectInstance } from 'react-select';
import { colourStylesBordered } from '@/helpers/selects';
import { GETFunction, createOption, Option } from '@/utils/globals';

interface IUserCategory {
    name: string
}

interface IUserGrade {
    name: string
}

interface IModalSelects2 {
    setValueCategory: React.Dispatch<React.SetStateAction<Option | null | undefined>>,
    valueCategory: Option | null | undefined
    setValueGrade: React.Dispatch<React.SetStateAction<Option | null | undefined>>,
    valueGrade: Option | null | undefined,
}

const ModalSelects2: React.FC<IModalSelects2> = ({ setValueGrade, valueGrade, setValueCategory, valueCategory}) => {
    const [optCategory, setOptCategory] = useState<any>(undefined)
    const [optGrade, setOptGrade] = useState<any>(undefined)
    const [isDisabled, setIsDisabled] = useState<boolean>(true)
    const [isRequired, setIsRequired] = useState<boolean>(false)

    const chargeCategory = async () => {
        const jsonData = await GETFunction('userCategory') as Array<IUserCategory>
        const optionsCategory = jsonData.map((category) => ({
            value: category.name,
            label: category.name
        }))
        setOptCategory(optionsCategory)
    }

    const chargeGrade = async () => {
        const jsonData = await GETFunction('userGrade') as Array<IUserGrade>
        const optionsGrade = jsonData.map((grade) => ({
            value: grade.name,
            label: grade.name
        }))
        setOptGrade(optionsGrade)
    }

    const selectCategory = (newValue: any) => {
        setValueCategory(newValue)

        switch (newValue.value) {
            case 'Militar':
                setIsDisabled(false)
                setIsRequired(true)
                break;
            default:
                setValueGrade(null)
                setIsDisabled(true)
                setIsRequired(false)
                break;
        }
    }

    useEffect(() => {
        chargeCategory()
        chargeGrade()
    }, [])

    return (
        <div className='flex gap-2 mb-2 mt-8'>
            <Select maxMenuHeight={200} value={valueCategory} onChange={(newValue: any) => selectCategory(newValue)} className='w-[50%]' options={optCategory} placeholder='Categoría' noOptionsMessage={({ inputValue }) => !inputValue ? 'No existe esa opción' : 'No existe esa opción'} isSearchable styles={colourStylesBordered} required></Select>
            <Select maxMenuHeight={200} value={valueGrade} onChange={(newValue: any) => setValueGrade(newValue)} isDisabled={isDisabled} required={isRequired} className='w-[50%]' options={optGrade} placeholder='Grado' noOptionsMessage={({ inputValue }) => !inputValue ? 'No existe esa opción' : 'No existe esa opción'} isSearchable styles={colourStylesBordered}></Select>
        </div>
  )
}

export default ModalSelects2