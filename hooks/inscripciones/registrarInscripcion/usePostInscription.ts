import { FormEvent, useState } from "react"
import { formatDateFromDatePicker, PUTFunction } from "@/utils/globals"
import { getLocalTimeZone, today } from "@internationalized/date";
import { SuccessAlert, QuestionAlert } from "@/components/sweetAlert/SweetsAlerts";
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
        } else {
            QuestionAlert('Registro Repetido', 'Este alumno fue cargado hace menos de 14 días, ¿Esta usted seguro de que desea cargarlo?', 'Cargar', () => {
                cargarIngreso(e, 1)
            })
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
        } else {
            cargarIngreso(e, 1)
        }
    }

    return { cargarIngreso, showSpinner }
}