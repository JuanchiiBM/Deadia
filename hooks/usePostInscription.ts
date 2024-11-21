import { FormEvent } from "react"
import { formatDateFromDatePicker } from "@/utils/globals"
import { getLocalTimeZone, today } from "@internationalized/date";
import { SuccessAlert, QuestionAlert } from "@/components/sweetAlert/SweetsAlerts";
import { POSTFunction } from "@/utils/globals";
import { IUsePostInscription } from "@/helpers/interfaces";

export const usePostInscription = ({ studentInfo, onClose}: IUsePostInscription) => {

    const cargarIngreso = async (e: FormEvent<HTMLFormElement>, repetido?: number) => {
        e.preventDefault()
        const _dataObject = {
            id_classroom: parseInt(studentInfo?.classroom?.value || ''),
            id_dependency: parseInt(studentInfo?.dependency?.value || ''),
            amount: studentInfo.amount,
            date: formatDateFromDatePicker(today(getLocalTimeZone())),
            dni: studentInfo.dni,
            name: studentInfo.name,
            last_name: studentInfo.lastname,
            email: studentInfo.mail,
            id_category: parseInt(studentInfo?.category?.value || ''),
            status: repetido == undefined ? 0 : 1,

            code: studentInfo.classroom?.label,
            begin_date: formatDateFromDatePicker(studentInfo.datePicker.start),
            end_date: formatDateFromDatePicker(studentInfo.datePicker.end),
            id_grade_type: parseInt(studentInfo?.curse?.value || '')
        }
        const response = await POSTFunction(`api/income/register/form`, _dataObject)
        console.log(response)
        if (response.status = 'ok') {
            SuccessAlert('Registro Cargado', '', 'Ok', () => {
                if (onClose)
                    onClose()
            })
        } else {
            QuestionAlert('Registro Repetido', 'Este alumno fue cargado hace menos de 14 días, ¿Esta usted seguro de que desea cargarlo?', 'Cargar', () => {
                cargarIngreso(e, 1)
            })
        }
    }

    return { cargarIngreso }
}