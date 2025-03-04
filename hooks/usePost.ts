import { FormEvent, useState } from "react"
import { SuccessAlert, QuestionAlert, ErrorAlert } from "@/components/sweetAlert/SweetsAlerts";
import { POSTFunction, PUTFunction, PUTFunctionConfig } from "@/utils/helpers/httpsFunctions";
import { useContextRegister } from "@/context/contextRegister";
import { capitalizeFirstLetter } from "@/utils/helpers/capitalization";


export interface IUsePost {
    _dataObject: { [key: string]: any }
    onClose: (() => void) | undefined
    oldRegister: any
    urlPost: string
    text: string
    configHeader?: boolean
}

export const usePost = ({ onClose, oldRegister, _dataObject, urlPost, text, configHeader }: IUsePost) => {
    const [showSpinner, setShowSpinner] = useState<boolean>(false)
    const { update, setRefreshData } = useContextRegister()

    const cargarIngreso = async (e: FormEvent<HTMLFormElement>, repetido?: number) => {
        e.preventDefault()
        console.log(_dataObject)
        if (_dataObject.status)
        repetido == undefined ? _dataObject.status = 0 : _dataObject.status = 1

        setShowSpinner(true)
        if (!update) {
            console.log(_dataObject)
            newRegister(_dataObject, e)
        } else {
            if (configHeader) {
                updateRegisterConfig(_dataObject, e)
            } else {
                updateRegister(_dataObject, e)
            }
        }

    }

    const newRegister = async (_dataObject: any, e: FormEvent<HTMLFormElement>) => {
        const response = await POSTFunction(`${urlPost}`, _dataObject)
        console.log(response)
        setShowSpinner(false)
        if (response.status == 'ok') {
            SuccessAlert(`${capitalizeFirstLetter(text)} Creado`, '', 'Ok', () => {
                setRefreshData((prev) => prev = prev + 1)
                if (onClose)
                    onClose()
            })
        } else if (response.result && response.result[0]) {
            QuestionAlert(`${capitalizeFirstLetter(text)} Repetido`, `Este ${capitalizeFirstLetter(text)} fue asignado por ultima vez el dia ${response.result[0].fecha} por ${response.result[0].usuario}, ¿Esta usted seguro de que desea cargarlo?`, 'Cargar', () => {
                cargarIngreso(e, 1)
            })
        } else if (response.error) {
            ErrorAlert('Error', response.error, 'Ok')
        }
    }

    const updateRegister = async (_dataObject: any, e: FormEvent<HTMLFormElement>) => {
        const response = await PUTFunction(`${urlPost}/${oldRegister.id}`, { oldRecords: oldRegister, newRecords: _dataObject })
        console.log(response)
        setShowSpinner(false)
        if (response.status == 'ok') {
            SuccessAlert(`${capitalizeFirstLetter(text)} Cargado`, '', 'Ok', () => {
                setRefreshData((prev) => prev = prev + 1)
                if (onClose)
                    onClose()
            })
        } else if (response.result && response.result[0]) {
            QuestionAlert(`${capitalizeFirstLetter(text)} Repetido`, `Este ${capitalizeFirstLetter(text)} fue asignado por ultima vez el dia ${response.result[0].fecha} por ${response.result[0].usuario}, ¿Esta usted seguro de que desea cargarlo?`, 'Cargar', () => {
                cargarIngreso(e, 1)
            })
        } else if (response.error) {
            ErrorAlert('Error', response.error, 'Ok')
        }
    }

    const updateRegisterConfig = async (_dataObject: any, e: FormEvent<HTMLFormElement>) => {
        const response = await PUTFunctionConfig(`${urlPost}/${oldRegister.id}`, { oldRecords: oldRegister, newRecords: _dataObject }, 'false', 'false')
        console.log(response)
        setShowSpinner(false)
        if (response.status == 'ok') {
            SuccessAlert(`${capitalizeFirstLetter(text)} Cargado`, '', 'Ok', () => {
                setRefreshData((prev) => prev = prev + 1)
                if (onClose)
                    onClose()
            })
        } else if (response.result && response.result[0]) {
            QuestionAlert(`${capitalizeFirstLetter(text)} Repetido`, `Este ${capitalizeFirstLetter(text)} fue asignado por ultima vez el dia ${response.result[0].fecha} por ${response.result[0].usuario}, ¿Esta usted seguro de que desea cargarlo?`, 'Cargar', () => {
                cargarIngreso(e, 1)
            })
        } else if (response.error) {
            ErrorAlert('Error', response.error, 'Ok')
        }
    }


    return { cargarIngreso, showSpinner }
}