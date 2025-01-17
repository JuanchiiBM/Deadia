import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faPowerOff, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import ReactDOMServer from 'react-dom/server';
import { MODULES, ACTIONS } from "@/utils/enums/permissions"
import useHandlerPermissions from "@/hooks/useHandlerPermissions"

const useDT = ({jsonData, refreshData}: {jsonData: any, refreshData: number}) => {
    const [tableData, setTableData] = useState<any[] | undefined>()
    const { hasPermission } = useHandlerPermissions()
    const columns = [
        { data: 'id', title: 'Nro.' },
        { data: 'nombre_completo', title: 'Nombre' },
        { data: 'nickname', title: 'Usuario' },
        { data: 'mail', title: 'Mail' },
        { data: 'perfil', title: 'Perfil' },
        { data: 'dependencia', title: 'Dependencia' },
        { data: 'fec_creacion', title: 'Fecha' },
        { data: 'acciones', title: 'Acciones' }
    ]

    const columnDefs = [
        { "width": "5%", "targets": 0 },
        { "width": "20%", "targets": 1 },
        { "width": "20%", "targets": 2 },
        { "width": "20%", "targets": 3 },
        { "width": "20%", "targets": 4 },
        { "width": "5%", "targets": 5 },
        { "width": "10%", "targets": 6 },
    ]

    const initializeDataTable = async () => {
        const tableDataMapped = jsonData.list.map((dato: any) => ({
            id: dato.id,
            id_dependencia: dato.id_dependencia,
            id_perfil: dato.id_perfil,
            dependencia: dato.dependencia,
            nombre: dato.nombre,
            nombre_completo: `${dato.nombre} ${dato.apellido}`,
            apellido: dato.apellido,
            fec_creacion: dato.fec_creacion,
            mail: dato.mail,
            nickname: dato.nickname,
            perfil: dato.perfil,
            estado: dato.estado,
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