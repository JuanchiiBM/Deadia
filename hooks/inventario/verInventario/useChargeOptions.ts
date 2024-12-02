import { useEffect, useState } from "react"
import { useEgressView } from "./useContext"
import { Option } from "@/utils/globals"
import { IDataEgressView, IDataEgressViewCatFilter, IDataEgressViewArtFilter } from "@/helpers/interfaces"

export const useChargeOptions = () => {
    const { jsonData, refreshData }: { jsonData: IDataEgressView, refreshData: number } = useEgressView()
    const [options, setOptions] = useState({
        categories: [{ value: '0', label: 'Todas' }],
        articles: [{}]
    })

    const chargeOptsCat = () => {
        setOptions((prev) => ({
            ...prev,
            categories: [{ value: '0', label: 'Todas' }].concat(jsonData.filter.category
                .map((opt) => ({
                    value: opt.id?.toString() || '',
                    label: opt.categoria
                }))
                .filter((opt) => opt.value !== '')
            ) as { value: string; label: string }[]
        }))
    }

    const chargeOptsArt = () => {
        setOptions((prev) => ({
            ...prev,
            articles: jsonData.filter.article.map((opt: IDataEgressViewArtFilter) => ({
                value: opt.id.toString(),
                label: opt.articulo
            })) as Option[]
        }))
    }

    //cambiar el effect
    useEffect(() => {
        if (jsonData && jsonData.list.categories && !jsonData.list.products)
            chargeOptsCat()

        if (jsonData && jsonData.list.articles)
            chargeOptsArt()
    }, [refreshData])

    useEffect(() => {
        if (jsonData && jsonData.list.categories && !jsonData.list.products)
            chargeOptsCat()

        if (jsonData && jsonData.list.articles)
            chargeOptsArt()
    }, [jsonData])

    return { options }
}