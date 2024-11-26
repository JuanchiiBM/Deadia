import { useEffect, useState } from "react"
import { useEgressRegisterContext } from "./useContext"
import { ITableDataEgress, ITableDataEgressInside } from "@/helpers/interfaces"

export const useDT = () => {
    const [tableData, setTableData] = useState<ITableDataEgressInside[] | undefined>()
    const columns = [
        { data: 'id', title: 'Nro.' },
        { data: 'categoria', title: 'Categoría' },
        { data: 'articulo', title: 'Articulo' },
        { data: 'usuario', title: 'Cargado por' },
        { data: 'fec_compra', title: 'Fecha' },
        { data: 'cantidad', title: 'Cantidad' },
        { data: 'monto', title: 'Monto' }
    ]
    const {jsonData, refreshData}: {jsonData: ITableDataEgress, refreshData: number} = useEgressRegisterContext()

    const initializeDataTable = async () => {
        setTableData(jsonData.list.map((dato) => ({
            id: dato.id,
            categoria: dato.categoria,
            articulo: dato.articulo,
            usuario: dato.usuario,
            fec_compra: dato.fec_compra,
            cantidad: dato.cantidad,
            monto: dato.monto
        })) as ITableDataEgressInside[])
    }

    useEffect(() => {
        if (jsonData)
        initializeDataTable()
    }, [jsonData])

    useEffect(() => {
        if (jsonData)
        initializeDataTable()
    }, [refreshData])

    return { tableData, columns}
}