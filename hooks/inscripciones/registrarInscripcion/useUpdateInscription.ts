import { useEffect } from "react"
import { createOption } from "@/utils/globals"
import { IUseUpdateInscription } from "@/helpers/interfaces"

export const useUpdateInscription = ({ setStudentInfo, contentModal, isOpen }: IUseUpdateInscription) => {
    useEffect(() => {
        setStudentInfo({
            dni: contentModal ? contentModal.dni : '',
            name: contentModal ? contentModal.nombre.split(' ')[1] : '',
            lastname: contentModal ? contentModal.nombre.split(' ')[0] : '',
            mail: contentModal ? contentModal.mail : '',
            category: contentModal ? contentModal.categoria.includes('(') ? contentModal.categoria.split(' ')[0] : contentModal.categoria : '',
            grade: contentModal && contentModal.grado != '-' ? contentModal.grado : '',
            classroom: contentModal ? contentModal.aula : null,
            curse: null,
            dependency: null,
            amount: contentModal ? contentModal.monto_acumulado.split(' de ')[0] : '',
            datePicker: {
                start: null,
                end: null
            }
        })
    }, [isOpen])

    let oldRegister = {
        id: contentModal ? contentModal.id : '',
        dni: contentModal ? contentModal.dni : '',
        name: contentModal ? contentModal.nombre.split(' ')[1] : '',
        lastname: contentModal ? contentModal.nombre.split(' ')[0] : '',
        mail: contentModal ? contentModal.mail : '',
        category: contentModal ? contentModal.categoria.includes('(') ? contentModal.categoria.split(' ')[0] : contentModal.categoria : null,
        grade: contentModal && contentModal.grado != '-' ? contentModal.grado : '',
        classroom: contentModal ? contentModal.aula : null,
        amount: contentModal ? contentModal.monto_acumulado.split(' de ')[0] : '',
    }
    return {oldRegister}
}