import { QuestionAlert, SuccessAlert, ErrorAlert } from "@/components/sweetAlert/SweetsAlerts"
import { DELETEFunction, POSTFunction, PUTFunction } from "@/utils/globals"
import { IUseDTAInscription, IUsersTableInside } from "@/helpers/interfaces"
import { useEffect, useState } from "react"
import { useContextRegister } from "@/hooks/useContextRegister"
import { useSidebarContext } from "@/pages/layout/layout-context"

export const useDTA = ({ tableData, setContentModal, onOpen }: IUseDTAInscription) => {
    const { setShowSpinner } = useSidebarContext()
    const { setUpdate, setRefreshData } = useContextRegister()

    const deleteRegister = (dato: IUsersTableInside) => {
        QuestionAlert('Desactivar usuario', 'Esta usted seguro de proceder con la accion?', 'Confirmar', async () => {
            setShowSpinner(true)
            const response = await DELETEFunction(`api/user/register/${dato.id}`)
            console.log(response)
            setShowSpinner(false)
            if (response.status == 'ok') {
                setRefreshData((prev) => prev = prev+1)
                SuccessAlert('Exito', 'Usuario desactivado')
            } else {
                ErrorAlert('Error', response.error)
            }
        })
    }

    const activateRegister = (dato: IUsersTableInside) => {
        QuestionAlert('Activar usuario', 'Esta usted seguro de proceder con la accion?', 'Confirmar', async () => {
            setShowSpinner(true)
            const _dataObject = {
                newRecords: {
                    trash: '0'
                },
                oldRecords: {
                    trash: '1'
                }
            }
            console.log(_dataObject)
            const response = await PUTFunction(`api/user/register/form/${dato.id}`, _dataObject)
            console.log(response)
            setShowSpinner(false)
            if (response.status == 'ok') {
                setRefreshData((prev) => prev = prev+1)
                SuccessAlert('Exito', 'Usuario activado')
            } else {
                ErrorAlert('Error', response.error)
            }
        })
    }

    const hydrateActions = () => {
        Array.from(document.getElementsByClassName('dt-paging-button')).forEach((button) => button.addEventListener('click', () => hydrateActions()))
        Array.from(document.getElementsByClassName('dt-input')).forEach((button) => button.addEventListener('change', () => hydrateActions()))
        if (tableData != undefined) {
            tableData.forEach((dato: IUsersTableInside) => {
                document.getElementById(`edit-btn-${dato.id}`)?.addEventListener('click', () => setContentModal(dato))
                document.getElementById(`edit-btn-${dato.id}`)?.addEventListener('click', () => setUpdate(true))
                document.getElementById(`delete-btn-${dato.id}`)?.addEventListener('click', () => deleteRegister(dato))
                document.getElementById(`activate-btn-${dato.id}`)?.addEventListener('click', () => activateRegister(dato))
                if (onOpen)
                    document.getElementById(`edit-btn-${dato.id}`)?.addEventListener('click', () => onOpen())
            })
        }
    }

    useEffect(() => {
        hydrateActions()
    }, [tableData])

    return true
}