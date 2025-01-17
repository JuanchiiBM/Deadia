import { useState, useEffect } from "react"
import { IModalSelects2Inscription, IncomeRegisterOptions, IncomeRegisterOptionClassroom } from "@/helpers/interfaces"
import { RangeValue } from "@nextui-org/react";
import { Option, createOption, formatDate } from "@/utils/globals"
import { parseDate } from "@internationalized/date";
import { useContextRegister } from "@/context/contextRegister";
import useJsonData from "@/hooks/useJsonData";

export const useSelectOptionsInscriptionModal = () => {
    const { refreshData } = useContextRegister()
    const { jsonData: optionsJsonData } = useJsonData({ url: 'api/income/register/form', refreshData })

    return { optionsJsonData }
}

export const useSelectOptionsInscription = ({ optionsJsonData }: { optionsJsonData: IncomeRegisterOptions }) => {
    const [options, setOptions] = useState<{
        classroom: Option[] | undefined,
        dependency: Option[] | undefined,
        grade: Option[] | undefined,
        value: Option[] | undefined
    }>({ classroom: undefined, dependency: undefined, grade: undefined, value: undefined })

    const chargueOptions = async () => {
        const optionsClassrooms = optionsJsonData.classrooms.map((opt) => ({
            value: opt.id.toString(),
            label: opt.codigo
        })) as Option[]
        const optionsDeps = optionsJsonData.deps.map((opt) => ({
            value: opt.id.toString(),
            label: opt.dependencia
        })) as Option[]
        const optionsGrades = optionsJsonData.grades.map((opt) => ({
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
        console.log(optionsJsonData)
        chargueOptions()
    }, [optionsJsonData])

    return { options, chargueNewClassroom }
}

interface IUseSelectHandleChangeInscription {
    handleInputChange: (field: string, value: string | RangeValue<any> | undefined | Option | null) => void
    optionsJsonData: IncomeRegisterOptions
    chargueNewClassroom: (value: Option) => void
    contentTable: any
    dataForm: any
}


export const useSelectHandleChangeInscription = ({ optionsJsonData, handleInputChange, chargueNewClassroom, contentTable, dataForm }: IUseSelectHandleChangeInscription) => {
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
        if (optionsJsonData?.classrooms.some((opt: IncomeRegisterOptionClassroom) => opt.id.toString() == newValue?.value)) {

            setIsDisabled(true)
            setCurseDisabled(true)
            optionsJsonData.classrooms.forEach((opt: IncomeRegisterOptionClassroom) => {
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
        const grade = optionsJsonData.grades.find((grade) => grade.id.toString() === newValue?.value)
        handleInputChange('curse', newValue)
        if (grade) {
            const discountedPricePerMonth = monthlyDiscount ? grade.precio_mes - monthlyDiscount : grade.precio_mes;
            console.log('entradescuento', discountedPricePerMonth)
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
        if (optionsJsonData && contentTable && contentTable.aula) {
            const jsonClassroomFiltered = optionsJsonData.classrooms.find((classroom) => { return classroom.codigo == contentTable.aula })
            console.log(jsonClassroomFiltered)
            const option: Option = {
                value: jsonClassroomFiltered?.id_curso.toString(),
                label: jsonClassroomFiltered?.codigo
            }
            selectOptionOfClassroom(option, 0)
        }
    }, [optionsJsonData])

    useEffect(() => {
        selectOptionOfClassroom(null, 0)
    }, [dataForm.category])

    useEffect(() => {
        setIsDisabled(true)
    }, [])

    return { selectOptionOfClassroom, selectOptionOfDependency, selectOptionOfCurse, classroomCreated, curseDisabled, optionsAmount, isDisabled }
}


export const useSelectOptionsInscription2 = ({ optionsJsonData, isOpen, handleInputChange }: IModalSelects2Inscription) => {
    const [options, setOptions] = useState<{
        category: Option[] | undefined,
        grade: Option[] | undefined,
        destination: Option[] | undefined
    }>({ category: undefined, grade: undefined, destination: undefined })
    const [isDisabled, setIsDisabled] = useState<boolean>(true)

    const chargeCategory = async () => {
        const optionsCategory = optionsJsonData.categories.map((category) => ({
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
        const jsonGradeFiltered = optionsJsonData.ranks.filter((grade) => {
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

    const chargeDestination = () => {
        const optionsDestination = optionsJsonData.destination.map((destination) => ({
            value: destination.id.toString(),
            label: destination.destino,
        })) as Option[]
        setOptions(prev => ({
            ...prev,
            destination: optionsDestination,
        }))
    }

    const selectCategory = (newValue: Option) => {
        handleInputChange('category', newValue)
        chargeGrade(parseInt(newValue.value || ''))        
    }

    useEffect(() => {
        chargeCategory()
        chargeDestination()
    }, [isOpen])

    return { options, isDisabled, selectCategory }
}
