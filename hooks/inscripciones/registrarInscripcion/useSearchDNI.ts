import React, { useEffect, useState } from "react"
import { createOption, GETFunction, Option } from "@/utils/globals"
import { RangeValue } from "@nextui-org/react"
import { IUseSearchDNI, IUseSearchDNIData, IUseFormInscription } from "@/helpers/interfaces"
import { useDebounce } from "@/hooks/useDebounce"


export const useSearchDNI = ({ handleInputChange, jsonData }: { handleInputChange: (field: string, value: string | RangeValue<any> | undefined | Option | null) => void, jsonData: any }) => {
    const [isLoadingDni, setIsLoading] = useState(false)
    const [dni, setDni] = useState("")
    const debouncedDni = useDebounce(dni, 500)

    const findOption = (id: number, type: string) => {
        let optionSelected
        if (type == 'category') {
            const option = jsonData.categories.map((cat: any) => {
                if (cat.id == id) {
                    optionSelected = createOption(cat.categoria, cat.id.toString())
                }
            })
        } else {
            const option = jsonData.ranks.map((cat: any) => {
                if (cat.id == id) {
                    optionSelected = createOption(cat.grado, cat.id.toString())
                }
            })
        }
        return optionSelected
    }

    useEffect(() => {
        const checkExistDNI = async () => {
            if (debouncedDni.length > 7) {
                setIsLoading(true)
                const response: IUseSearchDNI = await GETFunction(`api/pupil?dni=${debouncedDni}`)
                console.log(response)
                setIsLoading(false)
                if (response.list && response.list.pupil[0]) {
                    const data = response.list.pupil[0]
                    handleInputChange('name', data.nombre)
                    handleInputChange('lastname', data.apellido)
                    handleInputChange('mail', data.mail)
                    handleInputChange('id_pupil', data.id.toString())
                    handleInputChange('category', findOption(data.id_categoria, 'category'))
                    handleInputChange('grade', findOption(data.id_rango, 'grade'))
                } else {
                    handleInputChange('name', '')
                    handleInputChange('lastname', '')
                    handleInputChange('mail', '')
                    handleInputChange('category', null)
                    handleInputChange('grade', null)
                }
            }
        }

        checkExistDNI();
    }, [debouncedDni])

    return { isLoadingDni, setDni }
}