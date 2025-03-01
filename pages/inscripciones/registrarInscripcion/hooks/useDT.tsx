import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faPowerOff, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import ReactDOMServer from 'react-dom/server';
import moment from "moment";
import { MODULES, ACTIONS } from "@/utils/enums/permissions"
import useHandlerPermissions from "@/hooks/useHandlerPermissions"

const useDT = ({ jsonData, refreshData }: { jsonData: any, refreshData: number }) => {
    const [tableData, setTableData] = useState<any[] | undefined>()
    const { hasPermission } = useHandlerPermissions()
    const columns = [
        { data: 'id', title: 'Nro.' },
        { data: 'dni', title: 'DNI' },
        { data: 'nombre', title: 'Nombre' },
        { data: 'categoria', title: 'Categoría' },
        { data: 'destino', title: 'Destino' },
        { data: 'dependencia', title: 'Dependencia' },
        { data: 'curso', title: 'Curso' },
        { data: 'aula', title: 'Aula' },
        { data: 'fecha', title: 'Fecha' },
        { data: 'monto_acumulado', title: 'Monto' },
        { data: 'acciones', title: 'Acciones' }
    ]

    const columnDefs = undefined

    const initializeDataTable = async () => {
        const tableDataMapped = jsonData.list.map((dato: any) => ({
            id: dato.id,
            usuario: dato.usuario,
            dni: dato.dni_alumno,
            nombre: dato.nom_alumno,
            nombre_solo: dato.nombre,
            apellido: dato.apellido,
            destino: dato.destino,
            id_destino: dato.id_destino,
            mail: dato.mail,
            dependencia: dato.dependencia,
            categoria: dato.grado == null ? dato.categoria : `${dato.categoria} (${dato.grado})`,
            grado: dato.grado,
            cant_descontada_mes: dato.cant_descontada_mes,
            curso: dato.curso,
            aula: dato.aula,
            fecha: moment(moment(dato.fec_compra, "DD/MM/YYYY").toDate()).format("DD/MM/YYYY"),
            fec_inicio: dato.fec_inicio,
            fec_finalizacion: dato.fec_finalizacion,
            monto: dato.monto,
            monto_acumulado: dato.monto_acumulado ? dato.monto_acumulado.replace('/', 'de') : undefined,

            id_dependencia: dato.id_dependencia,
            id_alumno: dato.id_alumno,
            id_aula: dato.id_aula,
            id_categoria: dato.id_categoria,
            id_grado: dato.id_grado,
            id_curso: dato.id_curso,
            acciones: () => {
                return ReactDOMServer.renderToString(
                    <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                        {hasPermission(MODULES.MODULEINSCRIPTION, ACTIONS.UPDATE) && (
                            <button className="edit-btn btn-sigma" title="Editar registro" id={`edit-btn-${dato.id}`}>
                                <FontAwesomeIcon icon={faPenToSquare} className="text-2xl" />
                            </button>
                        )}
                        {hasPermission(MODULES.MODULEINSCRIPTION, ACTIONS.DELETE) && !dato.estado ? (
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