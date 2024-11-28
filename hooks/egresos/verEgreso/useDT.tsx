import { useEffect, useState } from "react"
import { useDepAcc } from "./useDepAcc"
import { useEgressView } from "./useContext"
import { IDataEgressView, IDataEgressViewArtList, IDataEgressViewCatList, IDataEgressViewProducts } from "@/helpers/interfaces"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import ReactDOMServer from 'react-dom/server';

export const useDT = ({ dateRef }: { dateRef: React.MutableRefObject<any> }) => {
    const [tableKey, setTableKey] = useState(0)
    const [tableColumns, setTableColumns] = useState([
        { data: 'categoria', title: 'Categoria' },
        { data: 'mes', title: 'Fecha' },
        { data: 'unidades_compradas', title: 'Unidades Totales' },
        { data: 'monto', title: 'Ingreso Acumulado' },
    ])
    const [tableData, setTableData] = useState<IDataEgressViewCatList[] | IDataEgressViewArtList[] | IDataEgressViewProducts[] | undefined>()
    const { jsonData, setChartContent }: { jsonData: IDataEgressView, setChartContent: any } = useEgressView()

    const switchToCategory = async () => {
        if (jsonData) {
            setTableKey((prev) => prev = prev + 1)
            const columns = [
                { data: 'categoria', title: 'Categoria' },
                { data: 'mes', title: 'Fecha' },
                { data: 'unidades_compradas', title: 'Unidades Totales' },
                { data: 'monto', title: 'Ingreso Acumulado' },
            ]
            setTableColumns(columns)

            const tableDataMapped = jsonData.list.categories.map((dato) => ({
                categoria: dato.categoria,
                monto: dato.monto,
                unidades_compradas: dato.unidades_compradas,
                mes: dato.mes
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

    const switchToArticle = async () => {
        if (jsonData) {
            setTableKey((prev) => prev = prev + 1)
            const columns = [
                { data: 'articulo', title: 'Artículo' },
                { data: 'mes', title: 'Fecha' },
                { data: 'unidades_compradas', title: 'Unidades Totales' },
                { data: 'monto', title: 'Ingreso Acumulado' }
            ]
            setTableColumns(columns)

            const tableDataMapped = jsonData.list.articles.map((dato) => ({
                articulo: dato.articulo,
                categoria: dato.categoria,
                mes: dato.mes,
                unidades_compradas: dato.unidades_compradas,
                monto: dato.monto
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
                { data: 'fec_compra', title: 'Fecha de compra'},
                { data: 'usuario', title: 'Cargado por' },
                { data: 'unidades_compradas', title: 'Unidades Totales' },
                { data: 'monto', title: 'Monto' },

            ]
            setTableColumns(columns)

            const finalData = jsonData.list.products.map((dato) => ({
                articulo: dato.articulo,
                fec_compra: dato.fec_compra,
                descripcion: dato.descripcion,
                unidades_compradas: dato.unidades_compradas,
                categoria: dato.categoria,
                usuario: dato.usuario,
                monto: dato.monto,
            }));

            setTableData(undefined)
            setTimeout(() => {
                setTableData(finalData)
            }, 100)
        }
    }

    useEffect(() => {
        if (jsonData && jsonData.list.categories && !jsonData.list.products) {
            switchToCategory()
        } else if (jsonData && jsonData.list.articles) {
            switchToArticle()
        } else if (jsonData && jsonData.list.products) {
            switchToProducts()
        }
    }, [jsonData])

    return { tableColumns, tableData, tableKey }
}