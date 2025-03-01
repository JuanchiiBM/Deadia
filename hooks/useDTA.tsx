import { QuestionAlert, SuccessAlert, ErrorAlert } from "@/components/sweetAlert/SweetsAlerts"
import { DELETEFunction, PUTFunction } from "@/utils/helpers/httpsFunctions"
import { useEffect } from "react"
import { useContextRegister } from "@/context/contextRegister"
import { useSidebarContext } from "@/components/layout/layout-context"
import { TuseDTA } from "@/utils/types/tables"

interface IuseDTA {
    tableData: any
    setContentTable: any
    onOpen: () => void
    useDTAContent: TuseDTA
}

export const useDTA = ({ tableData, setContentTable, onOpen, useDTAContent }: IuseDTA) => {
    const { setShowSpinner } = useSidebarContext()
    const { setUpdate, setRefreshData } = useContextRegister()

    const deleteRegister = (dato: any) => {
        QuestionAlert(`Desactivar ${useDTAContent.module}`, 'Esta usted seguro de proceder con la accion?', 'Confirmar', async () => {
            setShowSpinner(true)
            const response = await DELETEFunction(`${useDTAContent.urlDelete}${dato.id}`)
            console.log(response)
            setShowSpinner(false)
            if (response.status == 'ok') {
                setRefreshData((prev: number) => prev = prev+1)
                SuccessAlert('Exito', `${useDTAContent.module.toLocaleUpperCase()} desactivado`)
            } else {
                ErrorAlert('Error', response.error)
            }
        })
    }

    const activateRegister = (dato: any) => {
        QuestionAlert(`Activar ${useDTAContent.module}`, 'Esta usted seguro de proceder con la accion?', 'Confirmar', async () => {
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
            const response = await PUTFunction(`${useDTAContent.urlPut}${dato.id}`, _dataObject)
            console.log(response)
            setShowSpinner(false)
            if (response.status == 'ok') {
                setRefreshData((prev: number) => prev = prev+1)
                SuccessAlert('Exito', `${useDTAContent.module.toLocaleUpperCase()} activado`)
            } else {
                ErrorAlert('Error', response.error)
            }
        })
    }

    const hydrateActions = () => {
        Array.from(document.getElementsByClassName('dt-paging-button')).forEach((button) => button.addEventListener('click', () => hydrateActions()))
        Array.from(document.getElementsByClassName('dt-input')).forEach((button) => button.addEventListener('change', () => hydrateActions()))
        if (tableData != undefined) {
            tableData.forEach((dato: any) => {
                document.getElementById(`edit-btn-${dato.id}`)?.addEventListener('click', () => setContentTable(dato))
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