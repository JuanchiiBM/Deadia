import { FormEvent, useState } from "react"
import { formatDateFromDatePicker, PUTFunction } from "@/utils/globals"
import { SuccessAlert, QuestionAlert, ErrorAlert } from "@/components/sweetAlert/SweetsAlerts";
import { POSTFunction } from "@/utils/globals";
import { useContextRegister } from "@/hooks/useContextRegister";
import { IUseFormUsers } from "@/helpers/interfaces";


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
        const _dataObject = {
            name: dataForm.name,
            last_name: dataForm.lastname,
            password: dataForm.password,
            username: dataForm.user,
            mail: dataForm.mail,
            id_profile: dataForm.profile?.value && Number(dataForm.profile.value),
            id_dependency: dataForm.dependency?.value && Number(dataForm.dependency.value),
            status: repetido == undefined ? 0 : 1,
        }
        setShowSpinner(true)
        if (!update) {
            console.log(_dataObject)
            newRegister(_dataObject, e)
        } else {
            //updateRegister(_dataObject, e)
        }

    }

    const newRegister = async (_dataObject: any, e: FormEvent<HTMLFormElement>) => {
        const response = await POSTFunction(`api/user/register/form`, _dataObject)
        console.log(response)
        setShowSpinner(false)
        if (response.status == 'ok') {
            SuccessAlert('Usuario Creado', '', 'Ok', () => {
                setRefreshData((prev) => prev = prev + 1)
                if (onClose)
                    onClose()
            })
        } else if (response.error) {
            ErrorAlert('Error', response.error, 'Ok')
        }
    }

    const updateRegister = async (_dataObject: any, e: FormEvent<HTMLFormElement>) => {
        const response = await PUTFunction(`api/user/register/form/${oldRegister.id}`, { oldRecords: oldRegister, newRecords: _dataObject })
        console.log(response)
        setShowSpinner(false)
        if (response.status == 'ok') {
            SuccessAlert('Usuario Cargado', '', 'Ok', () => {
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