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
    }, [update])

    return {}
}