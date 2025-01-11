import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faPowerOff, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import ReactDOMServer from 'react-dom/server';
import { MODULES, ACTIONS } from "@/utils/enums/permissions"
import useHandlerPermissions from "@/hookss/useHandlerPermissions"
import { ITableDataEgress, ITableDataEgressInside } from "@/helpers/interfaces"

const useDT = ({jsonData, refreshData}: {jsonData: ITableDataEgress, refreshData: number}) => {
    const [tableData, setTableData] = useState<ITableDataEgressInside[] | undefined>()
    const { hasPermission } = useHandlerPermissions()
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

    const columnDefs = undefined

    const initializeDataTable = async () => {
        const tableDataMapped = jsonData.list.map((dato: any) => ({
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
                    <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                        {hasPermission(MODULES.MODULEUSER, ACTIONS.UPDATE) && (
                            <button className="edit-btn btn-sigma" title="Editar registro" id={`edit-btn-${dato.id}`}>
                                <FontAwesomeIcon icon={faPenToSquare} className="text-2xl" />
                            </button>
                        )}
                        {hasPermission(MODULES.MODULEUSER, ACTIONS.DELETE) && !dato.estado ? (
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