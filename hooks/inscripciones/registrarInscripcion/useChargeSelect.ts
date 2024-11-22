import { IUseFormInscription } from "@/helpers/interfaces"
import { createOption } from "@/utils/globals"
import { useEffect, useState } from "react"
import { useUpdateContext } from "./useUpdateContext"

export const useChargeSelect = ({ studentInfo, jsonData, selectOptionOfClassroom }: { studentInfo: IUseFormInscription, jsonData: any, selectOptionOfClassroom: any }) => {
    const { update } = useUpdateContext()

    const findOption = () => {
        const option = jsonData.classrooms.find((cat: any) =>
            cat.codigo == studentInfo.classroom
        )
        
        if (option && option.codigo) {
            const finalOption = {
                value: option.id.toString(),
                label: option.codigo
            }
            selectOptionOfClassroom(finalOption)
        }
    }

    useEffect(() => {
        if (update) {
            findOption()
        }
    }, [studentInfo])

    return {}
}

export const useChargeSelect2 = ({ studentInfo, jsonData, selectCategory, handleInputChange }: { studentInfo: IUseFormInscription | undefined, jsonData: any, selectCategory: any, handleInputChange: any }) => {

    const { update } = useUpdateContext()

    const findOption = () => {
        console.log(jsonData)
        console.log(studentInfo)
        const option = jsonData.categories.find((cat: any) =>
            cat.categoria == studentInfo?.category
        )
        
        if (option && option.categoria) {
            const finalOption = {
                value: option.id.toString(),
                label: option.categoria
            }
            selectCategory(finalOption)
        }

        const optionGrade = jsonData.ranks.find((cat: any) => 
            cat.grado == studentInfo?.grade
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
    }, [studentInfo])

    return {}
}