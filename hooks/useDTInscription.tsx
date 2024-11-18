import { useEffect, useState } from "react"
import { IRegister, IRegisters } from "@/helpers/interfaces"
import ReactDOMServer from 'react-dom/server';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

export const useDataTableInscription = ({ jsonData }: { jsonData: IRegisters | any }) => {
    const [tableData, setTableData] = useState<any[] | undefined>(undefined)
    const columnsData = [
        { data: 'dni', title: 'DNI' },
        { data: 'nombre', title: 'Nombre' },
        { data: 'categoria', title: 'Categoría' },
        { data: 'dependencia', title: 'Dependencia' },
        { data: 'curso', title: 'Curso' },
        { data: 'aula', title: 'Aula' },
        { data: 'fecha', title: 'Fecha' },
        { data: 'monto', title: 'Monto' },
        { data: 'acciones', title: 'Acciones' }
    ]

    useEffect(() => {
        if (jsonData) {
            const tableDataMapped = jsonData.list.map((dato: IRegister) => ({
                id: dato.id,
                usuario: dato.usuario,
                dni: dato.dni_alumno,
                grado: dato.dni_alumno,
                nombre: dato.nom_alumno,
                mail: dato.mail,
                categoria: dato.dni_alumno, //dato.categoria == 'Militar' ? `${dato.categoria} (${dato.grado})` : `${dato.categoria}`,
                categoriaSinGrado: dato.dni_alumno,
                dependencia: dato.dependencia,
                curso: dato.curso,
                aula: dato.aula,
                fecha: dato.fec_compra,
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
            }))
            console.log('carga3')
            setTimeout(() => {
                setTableData(tableDataMapped)
            }, 100);
        }
    }, [jsonData])

    return { tableData, columnsData }
}