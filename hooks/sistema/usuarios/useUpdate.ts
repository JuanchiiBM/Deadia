import { useEffect } from "react"
import { createOption, formatDate, transformToDateValue } from "@/utils/globals"
import { ITableDataEgressInside, IUseFormUsers } from "@/helpers/interfaces"

interface IUseUpdate {
    setDataForm: React.Dispatch<React.SetStateAction<IUseFormUsers>>,
    contentModal: ITableDataEgressInside | undefined,
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
            name: '',
            lastname: '',
            user: '',
            mail: '',
            profile: null,
            dependency: null,
            password: ''
        })
        
    }, [isOpen])

    let oldRegister

    if (contentModal) {
        oldRegister = {
            id: contentModal.id,
            id_article: contentModal.id_articulo,
            id_art_type: contentModal.id_categoria,
            name_art: contentModal.articulo,
            name_art_type: contentModal.categoria,
            description: contentModal.descripcion,
            amount: contentModal.monto,
            quantity: contentModal.cantidad,
            date: formatDate(contentModal.fec_compra.toString()),
        }
    }

    return { oldRegister }
}