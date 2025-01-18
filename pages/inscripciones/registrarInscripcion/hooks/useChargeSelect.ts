import { IUseFormInscription } from "@/helpers/interfaces"
import { useEffect, useState } from "react"
import { useContextRegister } from "@/context/contextRegister"

export const useChargeSelect = ({ dataForm, optionsJsonData, selectOptionOfClassroom, handleInputChange, optionsAmount, setOptionsAmount }: { dataForm: IUseFormInscription, optionsJsonData: any, selectOptionOfClassroom: any, handleInputChange: any, optionsAmount: any, setOptionsAmount: any }) => {
    const { update, contentTable } = useContextRegister()

    const findOption = () => {
        const option = optionsJsonData.classrooms.find((cat: any) =>
            cat.codigo == contentTable.aula
        )

        if (option && option.codigo) {
            const finalOption = {
                value: option.id.toString(),
                label: option.codigo
            }

            selectOptionOfClassroom(finalOption)
        }
    }

    const findOptionForAmount = () => {
        if (contentTable) {
            const montoAcumulado = contentTable.monto_acumulado.split(' de ')[0]
            const duracion = Number(contentTable.monto_acumulado.split(' de ')[1]) / Number(montoAcumulado)

            const option = optionsAmount.find((cat: any) =>
                cat.label.split('$')[1] == Number(contentTable.monto_acumulado.split(' de ')[0]) + Number(contentTable.cant_descontada_mes)
            )

            setOptionsAmount([{
                value: '0',
                label: `Por mes: $${montoAcumulado.toString()}`
            }, {
                value: '1',
                label: `Total: $${(montoAcumulado * duracion).toString()}`
            }])

            if (option) {
                handleInputChange('amount', optionsAmount[1])
            } else {
                handleInputChange('amount', optionsAmount[0])
            }
        }
    }

    const [oneTimeEffect, setOneTimeEffect] = useState(false)
    useEffect(() => {
        setOneTimeEffect(true)
        if (update) {
            setTimeout(() => {
                findOption()
            }, 500)
        }
    }, [update])

    useEffect(() => {
        if (update && optionsAmount) {
            setTimeout(() => {
                setOneTimeEffect(false)
                findOptionForAmount()
            }, 500)
        }
    }, [update, optionsAmount && oneTimeEffect])

    return {}
}


export const useChargeSelect2 = ({ dataForm, optionsJsonData, selectCategory, handleInputChange }: { dataForm: IUseFormInscription | undefined, optionsJsonData: any, selectCategory: any, handleInputChange: any }) => {
    const { update } = useContextRegister()

    const findOption = () => {
        const option = optionsJsonData.categories.find((cat: any) =>
            cat.categoria == dataForm?.category
        )

        if (option && option.categoria) {
            const finalOption = {
                value: option.id.toString(),
                label: option.categoria
            }
            selectCategory(finalOption)
        }

        const optionGrade = optionsJsonData.ranks.find((cat: any) =>
            cat.grado == dataForm?.grade
        )

        if (optionGrade && optionGrade.grado) {
            const finalOption = {
                value: optionGrade.id.toString(),
                label: optionGrade.grado
            }
            handleInputChange('grade', finalOption)
        }
    }

    useEffect(() => {
        if (update) {
            findOption()
        }
    }, [dataForm])

    return {}
}