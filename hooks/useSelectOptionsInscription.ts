import { useState, useEffect } from "react"
import { IModalSelects2Inscription, IncomeRegisterOptions, IncomeRegisterOptionClassroom, IUseSelectHandleChangeInscription } from "@/helpers/interfaces"
import { Option, createOption, formatDate } from "@/utils/globals"
import { parseDate } from "@internationalized/date";

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

export const useSelectHandleChangeInscription = ({jsonData, handleInputChange, chargueNewClassroom, contentModal}: IUseSelectHandleChangeInscription) => {
    const [curseDisabled, setCurseDisabled] = useState<boolean>(true)
    const [isDisabled, setIsDisabled] = useState<boolean>(true)

    const classroomCreated = (inputValue: string) => {
        const newOption = createOption(inputValue)
        chargueNewClassroom(newOption)
        handleInputChange('classroom', newOption)
        handleInputChange('curse', undefined)
        handleInputChange('dependency', undefined)
        handleInputChange('datePicker', { start: null, end: null })
        setIsDisabled(false)
        setOptionsCurse()
        setOptionsDependency()
    }

    const setOptionsCurse = async (setValue?: IncomeRegisterOptionClassroom) => {
        if (setValue) {
            const option: Option = { label: setValue.curso, value: setValue.id_curso.toString() }
            handleInputChange('curse', option)
        }
    }

    const setOptionsDependency = async (setValue?: IncomeRegisterOptionClassroom) => {
        if (setValue) {
            const option: Option = { label: setValue.dependencia, value: setValue.id_dependencia.toString() }
            handleInputChange('dependency', option)
        }
    }

    const selectOptionOfClassroom = async (newValue: Option) => {
        handleInputChange('classroom', newValue)
        if (jsonData?.classrooms.some((opt: IncomeRegisterOptionClassroom) => opt.id.toString() == newValue.value)) {
            setIsDisabled(true)
            jsonData.classrooms.forEach((opt: IncomeRegisterOptionClassroom) => {
                if (opt.id.toString() == newValue.value) {

                    setOptionsCurse(opt)
                    setOptionsDependency(opt)
                    handleInputChange('datePicker', {
                        start: parseDate(formatDate(opt.fec_inicio)),
                        end: parseDate(formatDate(opt.fec_finalizacion))
                    })
                }
            })
        } else {
            setIsDisabled(false)
            
            handleInputChange('curse', undefined)
            handleInputChange('dependency', undefined)
            handleInputChange('datePicker', {start: null, end: null})
        }
    }

    const selectOptionOfDependency = (newValue: Option) => {
        handleInputChange('dependency', newValue)
        newValue != null ? setCurseDisabled(false) : setCurseDisabled(true)
    }

    useEffect(() => {
        if (jsonData && contentModal && contentModal.aula) {
            const jsonClassroomFiltered = jsonData.classrooms.find((classroom) => { return classroom.codigo == contentModal.aula })
            console.log(jsonClassroomFiltered)
            const option: Option = {
                value: jsonClassroomFiltered?.id_curso.toString(),
                label: jsonClassroomFiltered?.codigo
            }
            selectOptionOfClassroom(option)
        }
    }, [jsonData])

    useEffect(() => {
        setIsDisabled(true)
    }, [])

    return {selectOptionOfClassroom, selectOptionOfDependency, classroomCreated, curseDisabled, isDisabled}
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
