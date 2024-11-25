import { useEffect, useState } from "react"
import { useUpdateContext } from "../registrarInscripcion/useUpdateContext"

export const useGetUrl = ({dateSelected, value}: {dateSelected: any | undefined, value: { value: string, type: string}}) => {
    const { refreshData } = useUpdateContext()
    const [url, setUrl] = useState(`api/income?start_date=${dateSelected && dateSelected[0]}&end_date=${dateSelected && dateSelected[1]}`)

    const changeUrlDeps = () => {
        switch (value.value) {
            case '0':
                setUrl(`api/income?start_date=${dateSelected[0]}&end_date=${dateSelected[1]}`)
                break;
            default:
                setUrl(`api/income?start_date=${dateSelected[0]}&end_date=${dateSelected[1]}&id_dependency=${value.value}`)
                break;
        }
    }

    const changeUrlGrades = () => {
        setUrl(`api/income?start_date=${dateSelected[0]}&end_date=${dateSelected[1]}&id_classroom=${value.value}`)
    }

    useEffect(() => {
        if (dateSelected && value.type == 'Deps') {
            changeUrlDeps()
        } else if (dateSelected && value.type == 'Grades') {
            changeUrlGrades()
        }
    }, [dateSelected])

    useEffect(() => {
        if (dateSelected && value.type == 'Deps') {
            changeUrlDeps()
        } else if (dateSelected && value.type == 'Grades') {
            changeUrlGrades()
        }
    }, [value])

    return {url}
}