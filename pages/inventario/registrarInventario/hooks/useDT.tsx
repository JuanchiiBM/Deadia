import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faPowerOff, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import ReactDOMServer from 'react-dom/server';
import { MODULES, ACTIONS } from "@/utils/enums/permissions"
import useHandlerPermissions from "@/hookss/useHandlerPermissions"
import { ITableDataInventory, ITableDataInventoryInside } from "@/helpers/interfaces";

const useDT = ({jsonData, refreshData}: {jsonData: ITableDataInventory, refreshData: number}) => {
    const [tableData, setTableData] = useState<ITableDataInventoryInside[] | undefined>()
    const { hasPermission } = useHandlerPermissions()
    const columns = [
        { data: 'id', title: 'Nro.' },
        { data: 'dependencia', title: 'Dependencia' },
        { data: 'categoria', title: 'Categoría' },
        { data: 'articulo', title: 'Articulo' },
        { data: 'fec_asignacion', title: 'Fecha' },
        { data: 'accion', title: 'Consumo/Asignado' },
        { data: 'cantidad', title: 'Cantidad' },
        { data: 'saldo_actual', title: 'Cantidad Total' },
        { data: 'acciones', title: 'Acciones' }
    ]

    const columnDefs = undefined

    const initializeDataTable = async () => {
        const tableDataMapped = jsonData.list.map((dato: ITableDataInventoryInside) => ({
            id: dato.id,
            id_articulo: dato.id_articulo,
            id_categoria: dato.id_categoria,
            id_dependencia: dato.id_dependencia,
            categoria: dato.categoria,
            articulo: dato.articulo,
            dependencia: dato.dependencia,
            fec_asignacion: dato.fec_asignacion,
            accion: dato.accion,
            cantidad: dato.cantidad,
            saldo_actual: dato.saldo_actual,
            saldo_restante: dato.saldo_restante,
            total_comprado: dato.total_comprado,
            acciones: () => {
                return ReactDOMServer.renderToString(
                    <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                        {hasPermission(MODULES.MODULEINVENTORY, ACTIONS.DELETE) && !dato.estado ? (
                            <button className="delete-btn btn-sigma" title="Borrar registro" id={`delete-btn-${dato.id}`}>
                                <FontAwesomeIcon icon={faTrashCan} className="text-2xl" />
                            </button>
                        ) : dato.estado == 'activo' ? (
                            <button className="delete-btn btn-sigma" title="Desactivar registro" id={`delete-btn-${dato.id}`}>
                                <FontAwesomeIcon icon={faPowerOff} className="text-2xl" />
                            </button>) : (
                            <button className="activate-btn btn-sigma" title="Activar registro" id={`activate-btn-${dato.id}`}>
                                <FontAwesomeIcon icon={faPowerOff} className="text-2xl" />
                            </button>
                        )}
                    </div>
                )
            }
        })) as any[]

         setTableData([]);
        setTimeout(() => {
            setTableData(tableDataMapped)
        }, 100)
    }

    useEffect(() => {
        console.log(jsonData)
        if (jsonData)
        initializeDataTable()
    }, [jsonData])

    return { tableData, columns, columnDefs }
}

export default useDT