import { useEffect, useState } from "react"
import { useDepAcc } from "./useDepAcc"
import { useContextView } from "@/context/contextView"
import { IDataInventoryView, IDataInventoryViewDepList, IDataInventoryViewArtList, IDataInventoryViewCatList } from "@/helpers/interfaces"

export const useDT = ({ dateRef }: { dateRef: React.MutableRefObject<any> }) => {
    const [tableKey, setTableKey] = useState(0)
    const [tableColumns, setTableColumns] = useState([
        { data: 'dependencia', title: 'Sector' },
        { data: 'mes', title: 'Fecha' },
        { data: 'total_asignado', title: 'Artículos Asignados' },
    ])
    const [tableData, setTableData] = useState<IDataInventoryViewDepList[] | IDataInventoryViewCatList[] | IDataInventoryViewArtList[] | undefined>()
    const { jsonData, setChartContent }: { jsonData: IDataInventoryView, setChartContent: any } = useContextView()

    const switchToCategory = async () => {
        console.log(jsonData)
        if (jsonData) {
            setTableKey((prev) => prev = prev + 1)
            const columns = [
                { data: 'dependencia', title: 'Sector' },
                { data: 'mes', title: 'Fecha' },
                { data: 'total_asignado', title: 'Artículos Asignados' },
            ]
            setTableColumns(columns)

            const tableDataMapped = jsonData.list.deps.map((dato) => ({
                dependencia: dato.dependencia,
                mes: dato.mes,
                tipos_producto: dato.tipos_producto,
                total_asignado: dato.total_asignado,
                total_consumido: dato.total_consumido
            }))
            console.log(tableDataMapped)
            const { changeRange } = useDepAcc({ tableDataMapped, dateRef })
            const promiseData = await changeRange()

            setTableData(undefined)
            setTimeout(() => {
                setTableData(promiseData)
                setChartContent(tableDataMapped)
            }, 100)
        }
    }

    const switchToArticle = async () => {
        if (jsonData) {
            setTableKey((prev) => prev = prev + 1)
            const columns = [
                { data: 'categoria', title: 'Rubro' },
                { data: 'mes', title: 'Fecha' },
                { data: 'total_asignado', title: 'Artículos Asignados' },
            ]
            setTableColumns(columns)

            const tableDataMapped = jsonData.list.categories.map((dato) => ({
                categoria: dato.categoria,
                mes: dato.mes,
                tipos_producto: dato.tipos_producto,
                total_asignado: dato.total_asignado,
                total_consumido: dato.total_consumido
            }))
            const { changeRange } = useDepAcc({ tableDataMapped, dateRef })
            const promiseData = await changeRange()


            setTableData(undefined)
            setTimeout(() => {
                setTableData(promiseData)
                setChartContent(tableDataMapped)
            }, 100)
        }
    }

    const switchToProducts = () => {
        if (jsonData) {
            setTableKey((prev) => prev = prev + 1)
            const columns = [
                { data: 'articulo', title: 'Artículo' },
                { data: 'mes', title: 'Fecha de Asignación'},
                { data: 'total_asignado', title: 'Cantidad Asignada' },
                { data: 'stock', title: 'Stock Disponible' },
            ]
            setTableColumns(columns)

            const finalData = jsonData.list.articles.map((dato) => ({
                articulo: dato.articulo,
                mes: dato.mes,
                stock: dato.stock,
                total_asignado: dato.total_asignado,
                total_consumido: dato.total_consumido
            }));

            setTableData(undefined)
            setTimeout(() => {
                setTableData(finalData)
            }, 100)
        }
    }

    useEffect(() => {
        console.log(jsonData)
        if (jsonData && jsonData.list.deps && !jsonData.list.articles) {
            switchToCategory()
        } else if (jsonData && jsonData.list.categories) {
            switchToArticle()
        } else if (jsonData && jsonData.list.articles) {
            switchToProducts()
        }
    }, [jsonData])

    return { tableColumns, tableData, tableKey }
}