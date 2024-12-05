import { useEffect, useState } from "react"
import { useContextView } from "@/hooks/useContextView"
import { Option } from "@/utils/globals"
import { IDataInventoryView, IDataInventoryViewDepFilter, IDataInventoryViewCatFilter } from "@/helpers/interfaces"

export const useChargeOptions = () => {
    const { jsonData, refreshData }: { jsonData: IDataInventoryView, refreshData: number } = useContextView()
    const [options, setOptions] = useState({
        dependencies: [{ value: '0', label: 'Seleccione' }],
        categories: [{}]
    })

    const chargeOptsCat = () => {
        setOptions((prev) => ({
            ...prev,
            dependencies: [{ value: '0', label: 'Seleccione' }].concat(jsonData.filter.dependency
                .map((opt) => ({
                    value: opt.id?.toString() || '',
                    label: opt.name
                }))
                .filter((opt) => opt.value !== '')
            ) as { value: string; label: string }[]
        }))
    }

    const chargeOptsArt = () => {
        setOptions((prev) => ({
            ...prev,
            categories: jsonData.filter.category.map((opt: IDataInventoryViewCatFilter) => ({
                value: opt.id.toString(),
                label: opt.categoria
            })) as Option[]
        }))
    }

    //cambiar el effect
    useEffect(() => {
        if (jsonData && jsonData.list.deps)
            chargeOptsCat()

        if (jsonData && jsonData.list.categories)
            chargeOptsArt()
    }, [refreshData])

    useEffect(() => {
        if (jsonData && jsonData.list.deps)
            chargeOptsCat()

        if (jsonData && jsonData.list.categories)
            chargeOptsArt()
    }, [jsonData])

    return { options }
}