import React, { useEffect, useState } from "react"
import { GETFunction, Option } from "@/utils/globals"
import { RangeValue } from "@nextui-org/react"
import { IUseSearchDNI, IUseSearchDNIData, IUseFormInscription } from "@/helpers/interfaces"

export const useSearchDNI = ({ handleInputChange }: { handleInputChange: (field: string, value: string | RangeValue<any> | undefined | Option | null) => void }) => {
    const [isLoading, setIsLoading] = useState(false)

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
            } else {
                handleInputChange('name', '')
                handleInputChange('lastname', '')
                handleInputChange('mail', '')
            }
        }
    }

    return { checkExistDNI, isLoading }
}