import { useEffect, useState } from "react"

export const useGetUrl = ({dateSelected, value}: {dateSelected: any | undefined, value: { value: string, type: string}}) => {
    const [url, setUrl] = useState(`api/loss?start_date=${dateSelected && dateSelected[0]}&end_date=${dateSelected && dateSelected[1]}`)

    const changeUrlCategories = () => {
        switch (value.value) {
            case '0':
                setUrl(`api/loss?start_date=${dateSelected[0]}&end_date=${dateSelected[1]}`)
                break;
            default:
                setUrl(`api/loss?start_date=${dateSelected[0]}&end_date=${dateSelected[1]}&id_category=${value.value}`)
                break;
        }
    }

    const changeUrlArticles = () => {
        setUrl(`api/loss?start_date=${dateSelected[0]}&end_date=${dateSelected[1]}&id_article=${value.value}`)
    }

    useEffect(() => {
        if (dateSelected && value.type == 'Categories') {
            changeUrlCategories()
        } else if (dateSelected && value.type == 'Articles') {
            changeUrlArticles()
        }
    }, [dateSelected])

    useEffect(() => {
        if (dateSelected && value.type == 'Categories') {
            changeUrlCategories()
        } else if (dateSelected && value.type == 'Articles') {
            changeUrlArticles()
        }
    }, [value])

    return {url}
}