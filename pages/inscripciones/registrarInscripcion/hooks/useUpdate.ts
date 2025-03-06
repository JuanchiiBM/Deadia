import { useEffect } from "react"
import { createOption } from "@/utils/helpers/options"
import { formatDate } from "@/utils/helpers/formatDates"

interface IUseUpdate {
    setDataForm: React.Dispatch<React.SetStateAction<any>>,
    contentTable: any | undefined,
    isOpen: boolean | undefined
}

const useUpdate = ({ setDataForm, contentTable, isOpen }: IUseUpdate) => {
    useEffect(() => {
        console.log(contentTable)
        setDataForm({
            dni: contentTable ? contentTable.dni : '',
            name: contentTable ? contentTable.nombre_solo : '',
            lastname: contentTable ? contentTable.apellido : '',
            mail: contentTable ? contentTable.mail : '',
            category: contentTable ? contentTable.categoria.includes('(') ? contentTable.categoria.split(' ')[0] : contentTable.categoria : '',
            grade: contentTable && contentTable.grado != '-' ? contentTable.grado : '',
            classroom: contentTable ? contentTable.aula : null,
            curse: null,
            destination: contentTable ? contentTable.destino && createOption(contentTable.destino, contentTable.id_destino) : null,
            dependency: null,
            id_pupil: contentTable ? contentTable.id_alumno : '',
            amount: contentTable ? contentTable.monto_acumulado.split(' de ')[0] : '',
            begin_date: contentTable ? contentTable.fec_inicio : '',
            end_date: contentTable ? contentTable.fec_finalizacion : '',
            date: contentTable && contentTable.fecha ? contentTable.fecha : new Date().toISOString().split('T')[0],
            datePicker: {
            start: null,
            end: null
            }
        })

    }, [isOpen])

    let oldRegister

    if (contentTable) {
        oldRegister = {
            id: contentTable ? contentTable.id : undefined,
            id_classroom: contentTable ? contentTable.id_aula : undefined,
            id_dependency: contentTable ? contentTable.id_dependencia : undefined,
            amount: contentTable ? contentTable.monto : undefined,
            date: contentTable ? formatDate(contentTable.fecha) : undefined,
            dni: contentTable ? contentTable.dni : undefined,
            name: contentTable ? contentTable.nombre_solo : undefined,
            last_name: contentTable ? contentTable.apellido: undefined,
            email: contentTable ? contentTable.mail : undefined,
            id_category: contentTable ? contentTable.id_categoria : undefined,
            id_pupil: contentTable ? contentTable.id_alumno : undefined,
            
            code: contentTable ? contentTable.aula : undefined,
            begin_date: contentTable ? formatDate(contentTable.fec_inicio) : undefined,
            end_date: contentTable ? formatDate(contentTable.fec_finalizacion) : undefined,
            id_grade_type: contentTable ? contentTable.id_curso : undefined,
            id_rank: contentTable ? contentTable.id_grado : '0',
            id_destination: contentTable ? contentTable.id_destino : '0',
        }
    }

    return { oldRegister }
}

export default useUpdate