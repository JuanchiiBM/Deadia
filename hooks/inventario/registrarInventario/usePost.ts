import { FormEvent, useState } from "react"
import { PUTFunction } from "@/utils/globals"
import { SuccessAlert, QuestionAlert } from "@/components/sweetAlert/SweetsAlerts";
import { POSTFunction } from "@/utils/globals";
import { useContextRegister } from "@/hooks/useContextRegister";
import { IUseFormEgressRegister } from "@/helpers/interfaces";

export interface IUsePost {
    dataForm: IUseFormEgressRegister
    onClose: (() => void) | undefined
    oldRegister: any
}

export const usePost = ({ dataForm, onClose, oldRegister }: IUsePost) => {
    const [showSpinner, setShowSpinner] = useState<boolean>(false)
    const { update, setRefreshData } = useContextRegister()

    const cargarIngreso = async (e: FormEvent<HTMLFormElement>, repetido?: number) => {
        e.preventDefault()
        const _dataObject = {
            id_article: !Number.isNaN(parseInt(dataForm.article?.value || '')) ? parseInt(dataForm.article?.value || '') : '',
            id_art_type: !Number.isNaN(parseInt(dataForm.category?.value || '')) ? parseInt(dataForm.category?.value || '') : '',
            name_art: dataForm.article?.label,
            name_art_type: dataForm.category?.label,
            description: dataForm.description,
            amount: dataForm.price,
            quantity: dataForm.amount,
            date: dataForm.datePicker?.toString(),
            status: repetido == undefined ? 0 : 1,
        }
        setShowSpinner(true)
        if (!update) {
            console.log(_dataObject)
            newRegister(_dataObject, e)
        } else {
            updateRegister(_dataObject, e)
        }

    }

    const newRegister = async (_dataObject: any, e: FormEvent<HTMLFormElement>) => {
        const response = await POSTFunction(`api/loss/register/form`, _dataObject)
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

    const updateRegister = async (_dataObject: any, e: FormEvent<HTMLFormElement>) => {
        const response = await PUTFunction(`api/loss/register/form/${oldRegister.id}`, { oldRecords: oldRegister, newRecords: _dataObject })
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