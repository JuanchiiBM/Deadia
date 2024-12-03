import { useEffect } from "react"
import { createOption, formatDate, transformToDateValue } from "@/utils/globals"
import { ITableDataEgressInside, IUseFormInventoryRegister } from "@/helpers/interfaces"

interface IUseUpdate {
    setDataForm: React.Dispatch<React.SetStateAction<IUseFormInventoryRegister>>,
    contentModal: ITableDataEgressInside | undefined,
    isOpen: boolean | undefined
}


export const useUpdate = ({ setDataForm, contentModal, isOpen }: IUseUpdate) => {
    useEffect(() => {
        // Se deja por si se llega a hacer un update
        /*
        setDataForm({
            category: contentModal ? createOption(contentModal.categoria, contentModal.id_categoria.toString()) : null,
            article: contentModal ? createOption(contentModal.articulo, contentModal.id_articulo.toString()) : null,
            description: contentModal ? contentModal.descripcion : '',
            amount: contentModal ? contentModal.cantidad.toString() : '',
            price: contentModal ? contentModal.monto.toString() : '',
            datePicker: contentModal ? transformToDateValue(contentModal.fec_compra) : null
        })
            */
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