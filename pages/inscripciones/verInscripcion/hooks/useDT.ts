import { useEffect, useState } from "react"
import { ITableDataClassrooms, ITableDataClassroomsInside, ITableDataDep, ITableDataDepInsideGrades, ITableDataDeps, ITableDataDepsInsideDeps } from "@/helpers/interfaces"
import { useDepAcc } from "./useDepAcc"
import { useContextView } from "@/context/contextView"

export const useDTInscription = ({ dateRef }: { dateRef: React.MutableRefObject<any> }) => {
    const [tableKey, setTableKey] = useState(0)
    const [tableColumns, setTableColumns] = useState([
        { data: 'dependencia', title: 'Dependencia' },
        { data: 'mes', title: 'Fecha' },
        { data: 'monto', title: 'Ingreso Acumulado' }])
    const [tableData, setTableData] = useState<ITableDataDepsInsideDeps[] | ITableDataDepInsideGrades[] | ITableDataClassroomsInside[] | undefined>()
    const { jsonData, setChartContent }: { jsonData: ITableDataDep & ITableDataDeps & ITableDataClassrooms, setChartContent: any} = useContextView()

    const switchToDeps = async () => {
        if (jsonData) {
            setTableKey((prev) => prev = prev+1)
            const columns = [
                { data: 'dependencia', title: 'Dependencia' },
                { data: 'mes', title: 'Fecha' },
                { data: 'monto', title: 'Ingreso Acumulado' },
            ]
            setTableColumns(columns)

            const tableDataMapped = jsonData.list.deps.map((dato) => ({
                dependencia: dato.dependencia,
                cant_alumnos: dato.cant_alumnos,
                mes: dato.mes,
                monto: dato.monto,
            }))

            const { changeRange } = useDepAcc({tableDataMapped, dateRef})
            const promiseData = await changeRange()

            setTableData(undefined)
            setTimeout(() => {
                setTableData(promiseData)
                setChartContent(tableDataMapped)
            }, 100)
        }
    }

    const switchToGrades = () => {
        if (jsonData) {
            setTableKey((prev) => prev = prev+1)
            const columns = [
                { data: 'curso', title: 'Curso' },
                { data: 'aula', title: 'Aula' },
                { data: 'cant_alumnos', title: 'Alumnos' },
                { data: 'fec_inicio', title: 'Fecha de Inicio' },
                { data: 'fec_finalizacion', title: 'Fecha de Finalizacion' },
                { data: 'ingreso', title: 'Ingreso' }
            ]
            setTableColumns(columns)

            const finalData = jsonData.list.grades.map((dato) => ({
                curso: dato.curso,
                aula: dato.aula,
                cant_alumnos: dato.cant_alumnos,
                fec_inicio: dato.fec_inicio,
                fec_finalizacion: dato.fec_finalizacion,
                ingreso: dato.ingreso
            }))
            setTableData(undefined)
            setTimeout(() => {
                setTableData(finalData)
                setChartContent(finalData)
            }, 100)
        }
    }

    const switchToClassrooms = () => {
        if (jsonData) {
            setTableKey((prev) => prev = prev+1)
            const columns = [
                { data: 'dni', title: 'DNI' },
                { data: 'nombre', title: 'Nombre' },
                { data: 'mail', title: 'Mail' },
                { data: 'fec_compra', title: 'Fecha de Pago'},
                { data: 'ingreso', title: 'Ingreso' },
            ]
            setTableColumns(columns)

            const finalData = jsonData.list.classrooms.map((alumno) => ({
                aula: alumno.aula,
                dni: alumno.dni,
                nombre: alumno.nombre,
                mail: alumno.mail,
                fec_compra: alumno.fec_compra,
                ingreso: alumno.ingreso
            }));

            setTableData(undefined)
            setTimeout(() => {
                setTableData(finalData)
            }, 100)
        }
    }

    useEffect(() => {
        if (jsonData && jsonData.list.deps && !jsonData.list.classrooms) {
            switchToDeps()
        } else if (jsonData && jsonData.list.grades) {
            switchToGrades()
        } else if (jsonData && jsonData.list.classrooms) {
            switchToClassrooms()
        }
    }, [jsonData])

    return { tableColumns, tableData, tableKey}
}