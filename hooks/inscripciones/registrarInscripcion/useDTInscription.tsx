import { useEffect, useState } from "react"
import { IRegister, IRegisters } from "@/helpers/interfaces"
import ReactDOMServer from 'react-dom/server';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import moment from "moment";

export const useDTInscription = ({ jsonData }: { jsonData: IRegisters | any }) => {
    const [tableData, setTableData] = useState<any[] | undefined>(undefined)
    const [columnsData, setColumnsData] = useState([
        { data: 'id', title: 'Nro.'},
        { data: 'dni', title: 'DNI' },
        { data: 'nombre', title: 'Nombre' },
        { data: 'categoria', title: 'Categoría' },
        { data: 'dependencia', title: 'Dependencia' },
        { data: 'curso', title: 'Curso' },
        { data: 'aula', title: 'Aula' },
        { data: 'fecha', title: 'Fecha' },
        { data: 'monto_acumulado', title: 'Monto' },
        { data: 'acciones', title: 'Acciones' }
    ])

    const mapData = () => { 
        const tableDataMapped = jsonData.list.map((dato: IRegister) => ({
            id: dato.id,
            usuario: dato.usuario,
            dni: dato.dni_alumno,
            nombre: dato.nom_alumno,
            mail: dato.mail,
            dependencia: dato.dependencia,
            categoria: dato.grado == null ? dato.categoria : `${dato.categoria} (${dato.grado})`,
            grado: dato.grado,
            curso: dato.curso,
            aula: dato.aula,
            fecha: moment(moment(dato.fec_compra, "DD/MM/YYYY").toDate()).format("DD/MM/YYYY"),
            monto_acumulado: dato.monto_acumulado.replace('/', 'de'),
            acciones: () => {
                return ReactDOMServer.renderToString(
                    <div id={`actions-${dato.id}`} style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                        <button className="edit-btn btn-sigma" id={`edit-btn-${dato.id}`}>
                            <FontAwesomeIcon icon={faPenToSquare} className="text-2xl text-default-400" /></button>
                        <button className="delete-btn btn-sigma" id={`delete-btn-${dato.id}`}> <FontAwesomeIcon icon={faTrashCan} className="text-2xl text-default-400" /> </button>
                    </div>
                );
            }
        }))

        setTimeout(() => {
            setTableData(tableDataMapped)
        }, 100)
    }

    useEffect(() => {
        if (jsonData) {
            mapData()
        }
    }, [jsonData])

    return { tableData, columnsData }
}