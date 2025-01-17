import { useEffect, useState } from "react"

let lastDependency = ''
export const useGetUrl = ({dateSelected, value}: {dateSelected: any | undefined, value: { value: string, type: string}}) => {
    const [url, setUrl] = useState(`api/inventory?start_date=${dateSelected && dateSelected[0]}&end_date=${dateSelected && dateSelected[1]}`)

    const changeUrlDependencies = () => {
        switch (value.value) {
            case '0':
                setUrl(`api/inventory?start_date=${dateSelected[0]}&end_date=${dateSelected[1]}`)
                break;
            default:
                lastDependency = value.value
                setUrl(`api/inventory?start_date=${dateSelected[0]}&end_date=${dateSelected[1]}&id_dependency=${value.value}`)
                break;
        }
    }

    const changeUrlCategories = () => {
        setUrl(`api/inventory?start_date=${dateSelected[0]}&end_date=${dateSelected[1]}&id_dependency=${lastDependency}&id_category=${value.value}`)
    }

    useEffect(() => {
        if (dateSelected && value.type == 'Dependencies') {
            changeUrlDependencies()
        } else if (dateSelected && value.type == 'Categories') {
            changeUrlCategories()
        }
    }, [dateSelected])

    useEffect(() => {
        console.log(value.type)
        if (dateSelected && value.type == 'Dependencies') {
            changeUrlDependencies()
        } else if (dateSelected && value.type == 'Categories') {
            changeUrlCategories()
        }
    }, [value])

    return {url}
}