import { IRegister } from "@/helpers/interfaces"
import { QuestionAlert, SuccessAlert, ErrorAlert } from "@/components/sweetAlert/SweetsAlerts"
import { DELETEFunction } from "@/utils/globals"
import { IUseDTAInscription } from "@/helpers/interfaces"
import { useEffect, useState } from "react"
import { useUpdateContext } from "./useUpdateContext"
import { useSidebarContext } from "@/pages/layout/layout-context"

export const useDTAInscription = ({ tableData, setContentModal, onOpen }: IUseDTAInscription) => {
    const { setShowSpinner } = useSidebarContext()
    const { update, setUpdate, setRefreshData } = useUpdateContext()

    const deleteRegister = (dato: IRegister) => {
        QuestionAlert('Borrar registro', 'Esta usted seguro de proceder con la accion?', 'Confirmar', async () => {
            setShowSpinner(true)
            const response = await DELETEFunction(`api/income/register/${dato.id}`)
            console.log(response)
            setShowSpinner(false)
            if (response.status == 'ok') {
                setRefreshData((prev) => prev = prev+1)
                SuccessAlert('Exito', 'Registro eliminado correctamente')
            } else {
                ErrorAlert('Error', response.error)
            }
        })
    }


    const hydrateActions = () => {
        Array.from(document.getElementsByClassName('dt-paging-button')).forEach((button) => button.addEventListener('click', () => hydrateActions()))
        Array.from(document.getElementsByClassName('dt-input')).forEach((button) => button.addEventListener('change', () => hydrateActions()))
        if (tableData != undefined) {
            tableData.forEach((dato: IRegister) => {
                document.getElementById(`edit-btn-${dato.id}`)?.addEventListener('click', () => setContentModal(dato))
                document.getElementById(`edit-btn-${dato.id}`)?.addEventListener('click', () => setUpdate(true))
                document.getElementById(`delete-btn-${dato.id}`)?.addEventListener('click', () => deleteRegister(dato))
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