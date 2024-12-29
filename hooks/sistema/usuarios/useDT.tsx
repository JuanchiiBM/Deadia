import { useEffect, useState } from "react"
import { useContextRegister } from "@/hooks/useContextRegister"
import { IUsersTable, IUsersTableInside } from "@/helpers/interfaces"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faPowerOff } from "@fortawesome/free-solid-svg-icons"
import ReactDOMServer from 'react-dom/server';
import { MODULES, ACTIONS } from "@/helpers/enums"
import { useHandlerPermissions } from "@/hooks/useHandlerPermissions"

export const useDT = () => {
    const [tableData, setTableData] = useState<IUsersTableInside[] | undefined>()
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
    const {jsonData, refreshData}: {jsonData: IUsersTable, refreshData: number} = useContextRegister()

    const initializeDataTable = async () => {
        const tableDataMapped = jsonData.list.map((dato) => ({
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
                    <div id={`actions-${dato.id}`} style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                        {hasPermission(MODULES.MODULEUSER, ACTIONS.UPDATE) && <button className="edit-btn btn-sigma" id={`edit-btn-${dato.id}`}> <FontAwesomeIcon icon={faPenToSquare} className="text-2xl text-default-400" /></button>}
                        {hasPermission(MODULES.MODULEUSER, ACTIONS.DELETE) && dato.estado == 'activo' ?
                        <button className="delete-btn btn-sigma" id={`delete-btn-${dato.id}`}> <FontAwesomeIcon icon={faPowerOff} className="text-2xl text-default-400" /> </button> :
                        <button className="activate-btn btn-sigma" id={`activate-btn-${dato.id}`} style={{backgroundColor: 'green'}}> <FontAwesomeIcon icon={faPowerOff} className="text-2xl text-default-400" /> </button>}
                    </div>
                );
            }
        })) as IUsersTableInside[]

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