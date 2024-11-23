import { useEffect, useState } from "react"
import { ITableDataDep, ITableDataDepInsideGrades, ITableDataDeps, ITableDataDepsInsideDeps } from "@/helpers/interfaces"
import { useDepAcc } from "./useDepAcc"
import { useInscriptionContext } from "./useInscriptionContext"

export const useDTInscription = ({ dateRef }: { dateRef: React.MutableRefObject<any> }) => {
    const [tableData, setTableData] = useState<ITableDataDepsInsideDeps[] | ITableDataDepInsideGrades[] | undefined>(undefined)
    const [columnsData, setColumnsData] = useState([
        { data: 'dependencia', title: 'Dependencia' },
        { data: 'mes', title: 'Fecha' },
        { data: 'monto', title: 'Ingreso Acumulado' },
    ])
    const { jsonData }: { jsonData: ITableDataDep & ITableDataDeps} = useInscriptionContext()

    const switchToDeps = async () => {
        if (jsonData) {
            setColumnsData([
                { data: 'dependencia', title: 'Dependencia' },
                { data: 'mes', title: 'Fecha' },
                { data: 'monto', title: 'Ingreso Acumulado' },
            ])

            const tableDataMapped = jsonData.list.deps.map((dato) => ({
                dependencia: dato.dependencia,
                cant_alumnos: dato.cant_alumnos,
                mes: dato.mes,
                monto: dato.monto,
            }))

            const { changeRange } = useDepAcc({tableDataMapped, dateRef})
            const promiseData = await changeRange()

            setTableData(promiseData)
        }
    }

    const switchToGrades = () => {
        if (jsonData) {
            setColumnsData([
                { data: 'curso', title: 'Curso' },
                { data: 'aula', title: 'Aula' },
                { data: 'cant_alumnos', title: 'Alumnos' },
                { data: 'fec_inicio', title: 'Fecha de Inicio' },
                { data: 'fec_finalizacion', title: 'Fecha de Finalizacion' },
                { data: 'ingreso', title: 'Ingreso' }
            ])

            setTableData(jsonData.list.grades.map((dato) => ({
                curso: dato.curso,
                aula: dato.aula,
                cant_alumnos: dato.cant_alumnos,
                fec_inicio: dato.fec_inicio,
                fec_finalizacion: dato.fec_finalizacion,
                ingreso: dato.ingreso
            })))
        }
    }

    useEffect(() => {
        if (jsonData && jsonData.list.deps) {
            switchToDeps()
        } else if (jsonData && jsonData.list.grades) {
            switchToGrades()
        }

    }, [jsonData])

    return { tableData, columnsData }
}