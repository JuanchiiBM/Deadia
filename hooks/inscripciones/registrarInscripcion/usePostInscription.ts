import { FormEvent, useState } from "react"
import { formatDateFromDatePicker, PUTFunction } from "@/utils/globals"
import { getLocalTimeZone, today } from "@internationalized/date";
import { SuccessAlert, QuestionAlert, ErrorAlert } from "@/components/sweetAlert/SweetsAlerts";
import { POSTFunction } from "@/utils/globals";
import { IUsePostInscription } from "@/helpers/interfaces";
import { useUpdateContext } from "./useUpdateContext";

export const usePostInscription = ({ studentInfo, onClose, oldRegister }: IUsePostInscription) => {
    const [showSpinner, setShowSpinner] = useState<boolean>(false)
    const { update, setUpdate, setRefreshData } = useUpdateContext()

    const cargarIngreso = async (e: FormEvent<HTMLFormElement>, repetido?: number) => {
        e.preventDefault()
        const _dataObject = {
            id_classroom: parseInt(studentInfo?.classroom?.value || ''),
            id_dependency: parseInt(studentInfo?.dependency?.value || ''),
            amount: parseInt(studentInfo?.amount?.label?.split('$')[1] || ''),
            date: formatDateFromDatePicker(today(getLocalTimeZone())),
            dni: studentInfo.dni,
            name: studentInfo.name,
            last_name: studentInfo.lastname,
            email: studentInfo.mail,
            id_category: parseInt(studentInfo?.category?.value || ''),
            id_pupil: !Number.isNaN(parseInt(studentInfo?.id_pupil || '')) ? parseInt(studentInfo?.id_pupil || '') : '',
            status: repetido == undefined ? 0 : 1,

            code: studentInfo.classroom?.label,
            begin_date: formatDateFromDatePicker(studentInfo.datePicker.start),
            end_date: formatDateFromDatePicker(studentInfo.datePicker.end),
            id_rank: studentInfo?.curse?.value ? parseInt(studentInfo?.curse?.value || '') : null
        }
        setShowSpinner(true)
        console.log(_dataObject)
        if (!update) {
            newRegister(_dataObject, e)
        } else {
            updateRegister(_dataObject, e)
        }

    }

    const newRegister = async (_dataObject: any, e: FormEvent<HTMLFormElement>) => {
        const response = await POSTFunction(`api/income/register/form`, _dataObject)
        console.log(response)
        setShowSpinner(false)
        if (response.status == 'ok') {
            SuccessAlert('Registro Cargado', '', 'Ok', () => {
                setRefreshData((prev) => prev = prev+1)
                if (onClose)
                    onClose()
            })
        } else if (response.result) {
            QuestionAlert('Registro Repetido', `Este alumno fue cargado por ultima vez el dia ${response.result[0].fecha} por ${response.result[0].usuario}, ¿Esta usted seguro de que desea cargarlo?`, 'Cargar', () => {
                cargarIngreso(e, 1)
            })
        } else if (response.error) {
            ErrorAlert('Error', response.error, 'Ok')
        }
    }

    const updateRegister = async (_dataObject: any, e: FormEvent<HTMLFormElement>) => {
        const response = await PUTFunction(`api/income/register/form/${oldRegister.id}`, {oldRecords: oldRegister, newRecords: _dataObject})
        console.log(response)
        setShowSpinner(false)
        if (response.status == 'ok') {
            SuccessAlert('Registro Cargado', '', 'Ok', () => {
                setRefreshData((prev) => prev = prev+1)
                if (onClose)
                    onClose()
            })
        } else if (response.result) {
            QuestionAlert('Registro Repetido', `Este alumno fue cargado por ultima vez el dia ${response.result[0].fecha} por ${response.result[0].usuario}, ¿Esta usted seguro de que desea cargarlo?`, 'Cargar', () => {
                cargarIngreso(e, 1)
            })
        } else if (response.error) {
            ErrorAlert('Error', response.error, 'Ok')
        }
    }

    return { cargarIngreso, showSpinner }
}