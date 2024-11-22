import { useEffect } from "react"
import { createOption } from "@/utils/globals"
import { IUseUpdateInscription } from "@/helpers/interfaces"

export const useUpdateInscription = ({ setStudentInfo, contentModal, isOpen }: IUseUpdateInscription) => {
    useEffect(() => {
        setStudentInfo({
            dni: contentModal ? contentModal.dni : '',
            name: contentModal ? contentModal.nombre.split(' ')[0] : '',
            lastname: contentModal ? contentModal.nombre.split(' ')[1] : '',
            mail: contentModal ? contentModal.mail : '',
            category: contentModal ? createOption(contentModal.categoria) : null,
            grade: contentModal && contentModal.grado != '-' ? contentModal.grado : null,
            classroom: contentModal ? contentModal.aula : null,
            curse: null,
            dependency: null,
            amount: contentModal ? contentModal.monto : '',
            datePicker: {
                start: null,
                end: null
            }
        })
    }, [isOpen])

    let oldRegister = {
        id: contentModal ? contentModal.id : '',
        dni: contentModal ? contentModal.dni : '',
        name: contentModal ? contentModal.nombre.split(' ')[0] : '',
        lastname: contentModal ? contentModal.nombre.split(' ')[1] : '',
        mail: contentModal ? contentModal.mail : '',
        category: contentModal ? createOption(contentModal.categoriaSinGrado) : null,
        grade: contentModal && contentModal.grado != '' ? contentModal.grado : null,
        classroom: contentModal ? contentModal.aula : null,
        amount: contentModal ? contentModal.monto : '',
    }

    return {oldRegister}
}