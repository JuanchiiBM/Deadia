import { useEffect } from "react"
import { createOption, formatDate, transformToDateValue } from "@/utils/globals"
import { IUsersTableInside, IUseFormUsers } from "@/helpers/interfaces"

interface IUseUpdate {
    setDataForm: React.Dispatch<React.SetStateAction<IUseFormUsers>>,
    contentModal: IUsersTableInside | undefined,
    isOpen: boolean | undefined
}
// ACTUALIZAR CUANDO SE EMPIECE USUARIOS!!!!
 /*
    category: contentModal ? createOption(contentModal.categoria, contentModal.id_categoria.toString()) : null,
    article: contentModal ? createOption(contentModal.articulo, contentModal.id_articulo.toString()) : null,
    description: contentModal ? contentModal.descripcion : '',
    amount: contentModal ? contentModal.cantidad.toString() : '',
    price: contentModal ? contentModal.monto.toString() : '',
    datePicker: contentModal ? transformToDateValue(contentModal.fec_compra) : null
*/
export const useUpdate = ({ setDataForm, contentModal, isOpen }: IUseUpdate) => {
    useEffect(() => {
        setDataForm({
            name: contentModal?.nombre || '',
            lastname: contentModal?.apellido || '',
            user: contentModal?.nickname || '',
            mail: contentModal?.mail || '',
            profile: contentModal ? createOption(contentModal.perfil, contentModal.id_perfil.toString()) : null,
            dependency: contentModal ? createOption(contentModal.dependencia, contentModal.id_dependencia.toString()) : null,
            password: ''
        })
        
    }, [isOpen])

    let oldRegister

    if (contentModal) {
        oldRegister = {
            id: contentModal.id,
            id_profile: contentModal.id_perfil,
            id_dependency: contentModal.id_dependencia,
            name: contentModal.nombre,
            lastname: contentModal.apellido,
            user: contentModal.nickname,
            mail: contentModal.mail,
        }
    }

    return { oldRegister }
}