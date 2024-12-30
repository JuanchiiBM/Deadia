import { useState, useEffect, use } from "react"
import { IModalSelects2Inscription, IncomeRegisterOptions, IncomeRegisterOptionClassroom } from "@/helpers/interfaces"
import { RangeValue } from "@nextui-org/react";
import { Option, createOption, formatDate } from "@/utils/globals"
import { parseDate } from "@internationalized/date";
import { GETFunction } from "@/utils/globals";
import { useJsonData } from "@/hooks/useJsonData";
import { useUpdateContext } from "./useUpdateContext";

export const useSelectOptionsInscriptionModal = ({ setOptionsCharged }: { setOptionsCharged: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const { refreshData } = useUpdateContext()
    const { jsonData, isLoading } = useJsonData({ url: 'api/income/register/form', refreshData })

    useEffect(() => {
        if (isLoading) {
            setOptionsCharged(false)
        } else {
            setOptionsCharged(true)
        }
    }, [isLoading])

    return { jsonData }
}

export const useSelectOptionsInscription = ({ jsonData }: { jsonData: IncomeRegisterOptions }) => {
    const [options, setOptions] = useState<{
        classroom: Option[] | undefined,
        dependency: Option[] | undefined,
        grade: Option[] | undefined,
        value: Option[] | undefined
    }>({ classroom: undefined, dependency: undefined, grade: undefined, value: undefined })

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
            ...prev,
            classroom: optionsClassrooms,
            dependency: optionsDeps,
            grade: optionsGrades,
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
    }, [jsonData])

    return { options, chargueNewClassroom }
}

interface IUseSelectHandleChangeInscription {
    handleInputChange: (field: string, value: string | RangeValue<any> | undefined | Option | null) => void
    jsonData: IncomeRegisterOptions
    chargueNewClassroom: (value: Option) => void
    contentModal: any
    studentInfo: any
}


export const useSelectHandleChangeInscription = ({ jsonData, handleInputChange, chargueNewClassroom, contentModal, studentInfo }: IUseSelectHandleChangeInscription) => {
    const [curseDisabled, setCurseDisabled] = useState<boolean>(true)
    const [isDisabled, setIsDisabled] = useState<boolean>(true)
    const [optionsAmount, setOptionsAmount] = useState<Option[] | undefined>(undefined)

    const classroomCreated = (inputValue: string) => {
        const newOption = createOption(inputValue)
        chargueNewClassroom(newOption)
        handleInputChange('classroom', newOption)
        handleInputChange('amount', undefined)
        selectOptionOfDependency(null)
        console.log('aca44')
        selectOptionOfCurse(null, 0)
        handleInputChange('datePicker', { start: null, end: null })
        setIsDisabled(false)
        setOptionsCurse()
        setOptionsDependency()
        setOptionsAmount(undefined)
    }

    const setOptionsCurse = async (setValue?: IncomeRegisterOptionClassroom, monthlyDiscount: number = 0) => {
        if (setValue) {
            const option: Option = { label: setValue.curso, value: setValue.id_curso.toString() }
            selectOptionOfCurse(option, monthlyDiscount)
        }
    }

    const setOptionsDependency = async (setValue?: IncomeRegisterOptionClassroom) => {
        if (setValue) {
            const option: Option = { label: setValue.dependencia, value: setValue.id_dependencia.toString() }
            handleInputChange('dependency', option)
        }
    }

    const selectOptionOfClassroom = async (newValue: Option | null, monthlyDiscount: number) => {
        handleInputChange('classroom', newValue)
        if (jsonData?.classrooms.some((opt: IncomeRegisterOptionClassroom) => opt.id.toString() == newValue?.value)) {

            setIsDisabled(true)
            setCurseDisabled(true)
            jsonData.classrooms.forEach((opt: IncomeRegisterOptionClassroom) => {
                if (opt.id.toString() == newValue?.value) {

                    setOptionsCurse(opt, monthlyDiscount)
                    setOptionsDependency(opt)
                    handleInputChange('datePicker', {
                        start: parseDate(formatDate(opt.fec_inicio)),
                        end: parseDate(formatDate(opt.fec_finalizacion))
                    })
                }
            })
        } else {
            setIsDisabled(false)
            handleInputChange('amount', undefined)
            selectOptionOfDependency(null)
            selectOptionOfCurse(null, monthlyDiscount)
            handleInputChange('amount', null)
            handleInputChange('datePicker', { start: null, end: null })
        }
    }

    const selectOptionOfDependency = (newValue: Option | null) => {
        handleInputChange('dependency', newValue)
        newValue != null ? setCurseDisabled(false) : setCurseDisabled(true)
    }

    const selectOptionOfCurse = (newValue: Option | null, monthlyDiscount: number) => {
        const grade = jsonData.grades.find((grade) => grade.id.toString() === newValue?.value)
        handleInputChange('curse', newValue)
        if (grade) {
            const discountedPricePerMonth = grade.precio_mes - monthlyDiscount;
            console.log('entradescuento', monthlyDiscount)
            setOptionsAmount([{
                value: '0',
                label: `Por mes: $${discountedPricePerMonth.toString()}`
            }, {
                value: '1',
                label: `Total: $${(discountedPricePerMonth * grade.duracion).toString()}`
            }])
        } else {
            setOptionsAmount([]);
        }
        console.log(optionsAmount)
    }

    useEffect(() => {
        if (jsonData && contentModal && contentModal.aula) {
            const jsonClassroomFiltered = jsonData.classrooms.find((classroom) => { return classroom.codigo == contentModal.aula })
            console.log(jsonClassroomFiltered)
            const option: Option = {
                value: jsonClassroomFiltered?.id_curso.toString(),
                label: jsonClassroomFiltered?.codigo
            }
            selectOptionOfClassroom(option, 0)
        }
    }, [jsonData])

    useEffect(() => {
        selectOptionOfClassroom(null, 0)
    }, [studentInfo.category])

    useEffect(() => {
        setIsDisabled(true)
    }, [])

    return { selectOptionOfClassroom, selectOptionOfDependency, selectOptionOfCurse, classroomCreated, curseDisabled, optionsAmount, isDisabled }
}


export const useSelectOptionsInscription2 = ({ jsonData, isOpen, handleInputChange }: IModalSelects2Inscription) => {
    const [options, setOptions] = useState<{
        category: Option[] | undefined,
        grade: Option[] | undefined
    }>({ category: undefined, grade: undefined })
    const [isDisabled, setIsDisabled] = useState<boolean>(true)

    const chargeCategory = async () => {
        const optionsCategory = jsonData.categories.map((category) => ({
            value: category.id.toString(),
            label: category.categoria,
            discount: category.descuento_mes
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

    return { options, isDisabled, selectCategory }
}
