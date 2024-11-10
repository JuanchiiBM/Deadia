import React, { useEffect, useState } from 'react'
import Select, { SelectInstance } from 'react-select';
import { colourStylesBordered } from '@/helpers/selects';
import { GETFunction, GETFunctionFake, Option } from '@/utils/globals';
import { IncomeRegisterOptions, dataObjectIds } from './modal';

interface IUserCategory {
    name: string
}

interface IUserGrade {
    name: string
}

interface IModalSelects2 {
    setValueCategory: React.Dispatch<React.SetStateAction<Option | null | undefined>>
    valueCategory: Option | null | undefined
    setValueGrade: React.Dispatch<React.SetStateAction<Option | null | undefined>>
    valueGrade: Option | null | undefined
    isOpen: boolean | undefined
    jsonData: IncomeRegisterOptions
    jsonIsCharged: boolean
    setDataObject: React.Dispatch<React.SetStateAction<dataObjectIds | any>>
}

const ModalSelects2: React.FC<IModalSelects2> = ({ setDataObject, jsonData, jsonIsCharged, setValueGrade, valueGrade, setValueCategory, valueCategory, isOpen }) => {
    const [optCategory, setOptCategory] = useState<any>(undefined)
    const [optGrade, setOptGrade] = useState<any>(undefined)
    const [isDisabled, setIsDisabled] = useState<boolean>(true)
    const [isRequired, setIsRequired] = useState<boolean>(false)

    const chargeCategory = async () => {
        const optionsCategory = jsonData.categories.map((category) => ({
            value: category.id,
            label: category.categoria
        }))
        setOptCategory(optionsCategory)
    }

    const chargeGrade = async (id_category: number) => {
        const jsonGradeFiltered = jsonData.ranks.filter((grade) => {
            return grade.id_categoria == id_category
        })

        const optionsGrade = jsonGradeFiltered.map((grade) => ({
            value: grade.id,
            label: grade.grado
        }))

        setOptGrade(optionsGrade)

        switch (optionsGrade.length) {
            case 0:
                setValueGrade(null)
                setIsDisabled(true)
                setIsRequired(false)
                break;
            default:
                setIsDisabled(false)
                setIsRequired(true)
                break;
        }
    }

    const selectCategory = (newValue: any) => {
        setValueCategory(newValue)
        setDataObject((dataPrev: dataObjectIds) => {
            dataPrev = dataPrev
            dataPrev.id_category = newValue.value
            return dataPrev
        })
        chargeGrade(newValue.value)
    }

    useEffect(() => {
        chargeCategory()
    }, [isOpen])

    return (
        <div className='flex gap-2 mb-2 mt-8'>
            <Select maxMenuHeight={200} value={valueCategory} onChange={(newValue: any) => selectCategory(newValue)} isDisabled={jsonIsCharged} className='w-[50%]' options={optCategory} placeholder='Categoría' noOptionsMessage={({ inputValue }) => !inputValue ? 'No existe esa opción' : 'No existe esa opción'} isSearchable styles={colourStylesBordered} required></Select>
            <Select maxMenuHeight={200} value={valueGrade} onChange={(newValue: any) => setValueGrade(newValue)} isDisabled={isDisabled} required={isRequired} className='w-[50%]' options={optGrade} placeholder='Grado' noOptionsMessage={({ inputValue }) => !inputValue ? 'No existe esa opción' : 'No existe esa opción'} isSearchable styles={colourStylesBordered}></Select>
        </div>
    )
}

export default ModalSelects2