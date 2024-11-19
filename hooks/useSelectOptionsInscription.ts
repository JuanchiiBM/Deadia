import { useState, useEffect } from "react"
import { IModalSelects2Inscription, IncomeRegisterOptions } from "@/helpers/interfaces"
import { Option } from "@/utils/globals"

export const useSelectOptionsInscription = ({ jsonData }: { jsonData:IncomeRegisterOptions}) => {
    const [options, setOptions] = useState<{
        classroom: Option[] | undefined,
        dependency: Option[] | undefined,
        grade: Option[] | undefined
    }>({classroom: undefined, dependency: undefined, grade: undefined})

    const chargueOptions = async () => {
        const optionsClassrooms = jsonData.classrooms.map((opt) => ({
            value: opt.id.toString(),
            label: opt.codigo
        })) as Option[]
        const optionsDeps = jsonData.deps.map((opt) => ({
            value: opt.id.toString(),
            label: opt.dependencia
        })) as Option[]
        const optionsGrades = jsonData.grades.map((opt) => ({
            value: opt.id.toString(),
            label: opt.curso
        })) as Option[]
        
        setOptions(prev => ({
            classroom: optionsClassrooms,
            dependency: optionsDeps,
            grade: optionsGrades
        })) 
    }

    const chargueNewClassroom = (newOption: Option) => {
        const prevClassrooms = options.classroom ? [...options.classroom] : []
        setOptions(prev => ({
            ...prev,
            classroom: [...prevClassrooms, newOption]
        })) 
    }

    useEffect(() => {
        chargueOptions()
    }, [])

    return {options, chargueNewClassroom}
}


export const useSelectOptionsInscription2 = ({ jsonData, isOpen, handleInputChange}: IModalSelects2Inscription) => {
    const [options, setOptions] = useState<{
        category: Option[] | undefined,
        grade: Option[] | undefined
    }>({category: undefined, grade: undefined})
    const [isDisabled, setIsDisabled] = useState<boolean>(true)

    const chargeCategory = async () => {
        const optionsCategory = jsonData.categories.map((category) => ({
            value: category.id.toString(),
            label: category.categoria
        })) as Option[]
        
        setOptions(prev => ({
            ...prev,
            category: optionsCategory,
        }))
    }

    const chargeGrade = async (id_category: number) => {
        const jsonGradeFiltered = jsonData.ranks.filter((grade) => {
            return grade.id_categoria == id_category
        })

        const optionsGrade = jsonGradeFiltered.map((grade) => ({
            value: grade.id.toString(),
            label: grade.grado
        })) as Option[]

        setOptions(prev => ({
            ...prev,
            grade: optionsGrade,
        }))

        switch (optionsGrade.length) {
            case 0:
                handleInputChange('grade', null)
                setIsDisabled(true)
                break;
            default:
                setIsDisabled(false)
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

    return {options, isDisabled, selectCategory}
}
