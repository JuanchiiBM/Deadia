import { FormEvent, useState } from "react"
import { formatDateFromDatePicker, PUTFunction } from "@/utils/globals"
import { SuccessAlert, QuestionAlert, ErrorAlert } from "@/components/sweetAlert/SweetsAlerts";
import { POSTFunction } from "@/utils/globals";
import { useContextRegister } from "@/hooks/useContextRegister";
import { IUseFormUsers } from "@/helpers/interfaces";
import { getLocalTimeZone, today } from "@internationalized/date";


export interface IUsePost {
    dataForm: IUseFormUsers
    onClose: (() => void) | undefined
    oldRegister: any
}

export const usePost = ({ dataForm, onClose, oldRegister }: IUsePost) => {
    const [showSpinner, setShowSpinner] = useState<boolean>(false)
    const { update, setRefreshData } = useContextRegister()

    const cargarIngreso = async (e: FormEvent<HTMLFormElement>, repetido?: number) => {
        e.preventDefault()
        /*
        const _dataObject = {
            id_article: !Number.isNaN(parseInt(dataForm.article?.value || '')) ? parseInt(dataForm.article?.value || '') : '',
            id_dependency: !Number.isNaN(parseInt(dataForm.category?.value || '')) ? parseInt(dataForm.category?.value || '') : '',
            quantity: Number(dataForm.action) > 0 ? Number(dataForm.action) : Number(dataForm.action) * -1,
            date: formatDateFromDatePicker(today(getLocalTimeZone())),
            type: Number(dataForm.action) > 0 ? 'assign' : 'consume',
            status: repetido == undefined ? 0 : 1,
        }
         */
        setShowSpinner(true)
        if (!update) {
            //console.log(_dataObject)
            //newRegister(_dataObject, e)
        } else {
            //updateRegister(_dataObject, e)
        }

    }

    const newRegister = async (_dataObject: any, e: FormEvent<HTMLFormElement>) => {
        const response = await POSTFunction(`api/inventory/register/form`, _dataObject)
        console.log(response)
        setShowSpinner(false)
        if (response.status == 'ok') {
            SuccessAlert('Registro Cargado', '', 'Ok', () => {
                setRefreshData((prev) => prev = prev + 1)
                if (onClose)
                    onClose()
            })
        } else if (response.result && response.result[0]) {
            QuestionAlert('Registro Repetido', `Este articulo fue asignado por ultima vez el dia ${response.result[0].fecha} por ${response.result[0].usuario} con una cantidad de ${response.result[0].cantidad} unidades, ¿Esta usted seguro de que desea cargarlo?`, 'Cargar', () => {
                cargarIngreso(e, 1)
            })
        } else if (response.error) {
            ErrorAlert('Error', response.error, 'Ok')
        }
    }

    const updateRegister = async (_dataObject: any, e: FormEvent<HTMLFormElement>) => {
        const response = await PUTFunction(`api/inventory/register/form/${oldRegister.id}`, { oldRecords: oldRegister, newRecords: _dataObject })
        console.log(response)
        setShowSpinner(false)
        if (response.status == 'ok') {
            SuccessAlert('Registro Cargado', '', 'Ok', () => {
                setRefreshData((prev) => prev = prev + 1)
                if (onClose)
                    onClose()
            })
        } else {
            QuestionAlert('Registro Repetido', `Este articulo fue cargado por ultima vez el dia ${response[0].fecha} por ${response[0].usuario} con una cantidad de ${response[0].cantidad} unidades, ¿Esta usted seguro de que desea cargarlo?`, 'Cargar', () => {
                cargarIngreso(e, 1)
            })
        }
    }

    return { cargarIngreso, showSpinner }
}