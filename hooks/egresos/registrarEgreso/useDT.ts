import { useEffect, useState } from "react"
import { useEgressRegisterContext } from "./useContext"

interface IRegisters {
    type: string
    article: string
    date: string
    amount: string
    ingress: string
}


export const useDT = () => {
    const [tableData, setTableData] = useState<IRegisters[] | undefined>()
    const columns = [
        { data: 'type', title: 'Tipo' },
        { data: 'article', title: 'Articulo' },
        { data: 'date', title: 'Fecha' },
        { data: 'amount', title: 'Cantidad' },
        { data: 'ingress', title: 'Monto' }
    ]
    const {jsonData, refreshData}: {jsonData: IRegisters[], refreshData: number} = useEgressRegisterContext()

    const initializeDataTable = async () => {
        const nextTableData = jsonData.map((dato) => ({
            type: dato.type,
            article: dato.article,
            date: dato.date,
            amount: dato.amount,
            ingress: dato.ingress
        }))
        setTableData(nextTableData)
    }

    useEffect(() => {
        if (jsonData)
        initializeDataTable()
    }, [])

    useEffect(() => {
        if (jsonData)
        initializeDataTable()
    }, [refreshData])

    return { tableData, columns}
}