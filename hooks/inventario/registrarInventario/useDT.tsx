import { useEffect, useState } from "react"
import { useContextRegister } from "@/hooks/useContextRegister"
import { ITableDataInventory, ITableDataInventoryInside } from "@/helpers/interfaces"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import ReactDOMServer from 'react-dom/server';
import { MODULES } from "@/helpers/enums"
import { useHandlerPermissions } from "@/hooks/useHandlerPermissions"

export const useDT = () => {
    const [tableData, setTableData] = useState<ITableDataInventoryInside[] | undefined>()
    const { hasPermission } = useHandlerPermissions()
    const columns = [
        { data: 'id', title: 'Nro.' },
        { data: 'dependencia', title: 'Dependencia' },
        { data: 'categoria', title: 'Categoría' },
        { data: 'articulo', title: 'Articulo' },
        { data: 'fec_asignacion', title: 'Fecha' },
        { data: 'cantidad', title: 'Asignado' },
        { data: 'saldo_actual', title: 'Cantidad Total' },
        { data: 'acciones', title: 'Acciones' }
    ]
    const {jsonData, refreshData}: {jsonData: ITableDataInventory, refreshData: number} = useContextRegister()

    const initializeDataTable = async () => {
        const tableDataMapped = jsonData.list.map((dato) => ({
            id: dato.id,
            id_articulo: dato.id_articulo,
            id_categoria: dato.id_categoria,
            id_dependencia: dato.id_dependencia,
            categoria: dato.categoria,
            articulo: dato.articulo,
            dependencia: dato.dependencia,
            fec_asignacion: dato.fec_asignacion,
            cantidad: dato.cantidad,
            saldo_actual: dato.saldo_actual,
            saldo_restante: dato.saldo_restante,
            total_comprado: dato.total_comprado,
            accion: dato.accion,
            acciones: () => {
                return ReactDOMServer.renderToString(
                    <div id={`actions-${dato.id}`} style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                        {hasPermission(MODULES.MODULEINVENTORY, 'PUT') && <button className="edit-btn btn-sigma" id={`edit-btn-${dato.id}`}> <FontAwesomeIcon icon={faPenToSquare} className="text-2xl text-default-400" /></button>}
                        {hasPermission(MODULES.MODULEINVENTORY, 'DELETE') && <button className="delete-btn btn-sigma" id={`delete-btn-${dato.id}`}> <FontAwesomeIcon icon={faTrashCan} className="text-2xl text-default-400" /> </button>}
                    </div>
                );
            }
        })) as ITableDataInventoryInside[]

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