import { useEffect } from "react"
import { createOption } from "@/utils/helpers/options"

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
            id_pupil: null,
            amount: contentTable ? contentTable.monto_acumulado.split(' de ')[0] : '',
            datePicker: {
                start: null,
                end: null
            }
        })

    }, [isOpen])

    let oldRegister

    if (contentTable) {
        oldRegister = {
            id: contentTable ? contentTable.id : '',
            dni: contentTable ? contentTable.dni : '',
            name: contentTable ? contentTable.nombre.split(' ')[1] : '',
            lastname: contentTable ? contentTable.nombre.split(' ')[0] : '',
            mail: contentTable ? contentTable.mail : '',
            category: contentTable ? contentTable.categoria.includes('(') ? contentTable.categoria.split(' ')[0] : contentTable.categoria : null,
            grade: contentTable && contentTable.grado != '-' ? contentTable.grado : '',
            classroom: contentTable ? contentTable.aula : null,
            amount: contentTable ? contentTable.monto_acumulado.split(' de ')[0] : '',
            destination: contentTable ? contentTable.destino : null,
        }
    }

    return { oldRegister }
}

export default useUpdate