import { useEffect } from "react"
import { createOption } from "@/utils/globals"
import { IUseUpdateInscription } from "@/helpers/interfaces"

export const useUpdateInscription = ({ setStudentInfo, contentModal, isOpen}: IUseUpdateInscription) => {
    useEffect(() => {
        setStudentInfo({
            dni: contentModal ? contentModal.dni : '',
            name: contentModal ? contentModal.nombre.split(' ')[0] : '',
            lastname: contentModal ? contentModal.nombre.split(' ')[1] : '',
            mail: contentModal ? contentModal.mail : '',
            category: contentModal ? createOption(contentModal.categoriaSinGrado) : null,
            grade: contentModal && contentModal.grado != '' ? createOption(contentModal.grado) : null,
            classroom: contentModal ? createOption(contentModal.aula) : null,
            curse: null,
            dependency: null,
            amount: contentModal ? contentModal.monto : '',
            datePicker: {
                start: null,
                end: null
            }
        })
    }, [isOpen])

    return true
}