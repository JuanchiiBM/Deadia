import { useEffect, useState } from "react"
import { useContextView } from "@/context/contextView"
import { Option } from "@/utils/globals"
import { ITableDataClassrooms, ITableDataDep, ITableDataDepInsideFilter, ITableDataDeps, ITableDataDepsInsideFilter } from "@/helpers/interfaces"

export const useChargeOptions = () => {
    const { jsonData, refreshData }: { jsonData: ITableDataDeps & ITableDataDep & ITableDataClassrooms, refreshData: number } = useContextView()
    const [options, setOptions] = useState({
        deps: [{ value: '0', label: 'Todas' }],
        grades: [{}]
    })

    const chargeOptsDeps = () => {
        setOptions((prev) => ({
            ...prev,
            deps: [{ value: '0', label: 'Todas' }].concat(jsonData.filter.dependency
                .map((opt: ITableDataDepsInsideFilter) => ({
                    value: opt.id?.toString() || '',
                    label: opt.name
                }))
                .filter((opt) => opt.value !== '')
            ) as { value: string; label: string }[]
        }))
    }

    const chargeOptsClassrooms = () => {
        setOptions((prev) => ({
            ...prev,
            grades: jsonData.filter.classroom.map((opt: ITableDataDepInsideFilter) => ({
                value: opt.id.toString(),
                label: `${opt.code} | ${opt.grade}`
            })) as Option[]
        }))
    }

    //cambiar el effect
    useEffect(() => {
        if (jsonData && jsonData.list.deps && !jsonData.list.classrooms)
            chargeOptsDeps()

        if (jsonData && jsonData.list.grades)
            chargeOptsClassrooms()
    }, [refreshData])

    useEffect(() => {
        if (jsonData && jsonData.list.deps && !jsonData.list.classrooms)
            chargeOptsDeps()

        if (jsonData && jsonData.list.grades)
            chargeOptsClassrooms()
    }, [jsonData])

    return { options }
}