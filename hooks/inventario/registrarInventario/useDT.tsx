import { useEffect, useState } from "react"
import { useEgressRegisterContext } from "./useContext"
import { ITableDataEgress, ITableDataEgressInside } from "@/helpers/interfaces"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import ReactDOMServer from 'react-dom/server';

export const useDT = () => {
    const [tableData, setTableData] = useState<ITableDataEgressInside[] | undefined>()
    const columns = [
        { data: 'id', title: 'Nro.' },
        { data: 'categoria', title: 'Categoría' },
        { data: 'articulo', title: 'Articulo' },
        { data: 'usuario', title: 'Cargado por' },
        { data: 'fec_compra', title: 'Fecha' },
        { data: 'cantidad', title: 'Cantidad' },
        { data: 'monto', title: 'Monto' },
        { data: 'acciones', title: 'Acciones' }
    ]
    const {jsonData, refreshData}: {jsonData: ITableDataEgress, refreshData: number} = useEgressRegisterContext()

    const initializeDataTable = async () => {
        const tableDataMapped = jsonData.list.map((dato) => ({
            id: dato.id,
            id_articulo: dato.id_articulo,
            id_categoria: dato.id_categoria,
            categoria: dato.categoria,
            articulo: dato.articulo,
            usuario: dato.usuario,
            fec_compra: dato.fec_compra,
            descripcion: dato.descripcion,
            cantidad: dato.cantidad,
            monto: dato.monto,
            acciones: () => {
                return ReactDOMServer.renderToString(
                    <div id={`actions-${dato.id}`} style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                        <button className="edit-btn btn-sigma" id={`edit-btn-${dato.id}`}>
                            <FontAwesomeIcon icon={faPenToSquare} className="text-2xl text-default-400" /></button>
                        <button className="delete-btn btn-sigma" id={`delete-btn-${dato.id}`}> <FontAwesomeIcon icon={faTrashCan} className="text-2xl text-default-400" /> </button>
                    </div>
                );
            }
        })) as ITableDataEgressInside[]

        setTimeout(() => {
            setTableData(tableDataMapped)
        }, 100)
    }

    useEffect(() => {
        if (jsonData)
        initializeDataTable()
    }, [jsonData])

    return { tableData, columns}
}