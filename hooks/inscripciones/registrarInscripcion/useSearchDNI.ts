import React, { useEffect, useState } from "react"
import { createOption, GETFunction, Option } from "@/utils/globals"
import { RangeValue } from "@nextui-org/react"
import { IUseSearchDNI, IUseSearchDNIData, IUseFormInscription } from "@/helpers/interfaces"

export const useSearchDNI = ({ handleInputChange, jsonData }: { handleInputChange: (field: string, value: string | RangeValue<any> | undefined | Option | null) => void, jsonData: any }) => {
    const [isLoading, setIsLoading] = useState(false)

    const findOption = (id: number, type: string) => {
        let option
        if (type == 'categories') {
            option = jsonData.categories.map((cat: any) => {
                if (cat.id == id) {
                    return createOption(cat.categoria, cat.id)
                }
            })
        } else {
            option = jsonData.ranks.map((cat: any) => {
                if (cat.id == id) {
                    return createOption(cat.grado, cat.id)
                }
            })
        }
        return option
    }

    const checkExistDNI = async (value: string) => {
        handleInputChange('dni', value)

        if (value.length > 7) {
            setIsLoading(true)
            const response: IUseSearchDNI = await GETFunction(`api/pupil?dni=${value}`)
            console.log(response)
            setIsLoading(false)
            if (response.list && response.list.pupil[0]) {
                const data = response.list.pupil[0]
                handleInputChange('name', data.nombre)
                handleInputChange('lastname', data.apellido)
                handleInputChange('mail', data.mail)
                handleInputChange('category', findOption(data.id_categoria, 'categories'))
                handleInputChange('grade', findOption(data.id_rango, 'ranks'))
            } else {
                handleInputChange('name', '')
                handleInputChange('lastname', '')
                handleInputChange('mail', '')
                handleInputChange('category', null)
                handleInputChange('grade', null)
            }
        }
    }

    return { checkExistDNI }
}