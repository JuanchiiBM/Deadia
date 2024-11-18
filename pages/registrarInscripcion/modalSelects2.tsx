import React, { useEffect, useState } from 'react'
import Select, { SelectInstance } from 'react-select';
import { colourStylesBordered } from '@/helpers/selects';
import { GETFunction, GETFunctionFake, Option } from '@/utils/globals';
import { IncomeRegisterOptions } from './modal';
import { IUseFormInscription } from '@/helpers/interfaces';
import { RangeValue } from '@nextui-org/react';

interface IUserCategory {
    name: string
}

interface IUserGrade {
    name: string
}

interface IModalSelects2 {
    studentInfo: IUseFormInscription
    handleInputChange: (field: string, value: string | RangeValue<any> | undefined | Option) => void
    isOpen: boolean | undefined
    jsonData: IncomeRegisterOptions
    jsonIsCharged: boolean
}

const ModalSelectsRegistrarIngreso2: React.FC<IModalSelects2> = ({ jsonData, jsonIsCharged, studentInfo, handleInputChange, isOpen }) => {
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
                handleInputChange('grade', undefined)
                setIsDisabled(true)
                setIsRequired(false)
                break;
            default:
                setIsDisabled(false)
                setIsRequired(true)
                break;
        }
    }

    const selectCategory = (newValue: Option) => {
        handleInputChange('category', newValue)
        chargeGrade(parseInt(newValue.value || ''))
    }

    useEffect(() => {
        chargeCategory()
    }, [isOpen])

    return (
        <div className='flex gap-2 mb-2 mt-8'>
            <Select maxMenuHeight={200} value={studentInfo.category} onChange={(newValue: any) => selectCategory(newValue)} isDisabled={jsonIsCharged} className='w-[50%]' options={optCategory} placeholder='Categoría' noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} isSearchable styles={colourStylesBordered} required></Select>
            <Select maxMenuHeight={200} value={studentInfo.grade} onChange={(newValue: any) => handleInputChange('grade', newValue)} isDisabled={isDisabled} required={isRequired} className='w-[50%]' options={optGrade} placeholder='Grado' noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} isSearchable styles={colourStylesBordered}></Select>
        </div>
    )
}

export default ModalSelectsRegistrarIngreso2