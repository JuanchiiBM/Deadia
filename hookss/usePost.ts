import { FormEvent, useState } from "react"
import { SuccessAlert, QuestionAlert, ErrorAlert } from "@/components/sweetAlert/SweetsAlerts";
import { POSTFunction, PUTFunction } from "@/utils/helpers/httpsFunctions";
import { useContextRegister } from "@/context/contextRegister";
import { capitalizeFirstLetter } from "@/utils/helpers/capitalization";


export interface IUsePost {
    _dataObject: { [key: string]: any }
    onClose: (() => void) | undefined
    oldRegister: any
    urlPost: string
    text: string
}

export const usePost = ({ onClose, oldRegister, _dataObject, urlPost, text }: IUsePost) => {
    const [showSpinner, setShowSpinner] = useState<boolean>(false)
    const { update, setRefreshData } = useContextRegister()

    const cargarIngreso = async (e: FormEvent<HTMLFormElement>, repetido?: number) => {
        e.preventDefault()

        repetido == undefined ? _dataObject.status = 0 : _dataObject.status = 1

        setShowSpinner(true)
        if (!update) {
            console.log(_dataObject)
            newRegister(_dataObject, e)
        } else {
            updateRegister(_dataObject, e)
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
        } else if (response.error) {
            ErrorAlert('Error', response.error, 'Ok')
        }
    }

    return { cargarIngreso, showSpinner }
}