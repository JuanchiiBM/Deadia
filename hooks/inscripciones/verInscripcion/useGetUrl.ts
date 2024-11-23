import { useEffect, useState } from "react"
import { useUpdateContext } from "../registrarInscripcion/useUpdateContext"

export const useGetUrl = ({dateSelected, value}: {dateSelected: any | undefined, value: string}) => {
    const { refreshData } = useUpdateContext()
    const [url, setUrl] = useState(`api/income?start_date=${dateSelected && dateSelected[0]}&end_date=${dateSelected && dateSelected[1]}`)

    const changeUrl = () => {
        if (dateSelected)
        switch (value) {
            case '0':
                setUrl(`api/income?start_date=${dateSelected[0]}&end_date=${dateSelected[1]}`)
                break;
            default:
                setUrl(`api/income?start_date=${dateSelected[0]}&end_date=${dateSelected[1]}&id_dependency=${value}`)
                break;
        }
    }

    useEffect(() => {
        if (dateSelected)
        changeUrl()
    }, [dateSelected])

    return {url}
}