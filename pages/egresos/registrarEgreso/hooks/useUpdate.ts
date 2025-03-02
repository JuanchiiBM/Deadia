import { useEffect } from "react"
import { createOption, formatDate, transformToDateValue } from "@/utils/globals"
import { ITableDataEgressInside, IUseFormEgressRegister } from "@/helpers/interfaces"

interface IUseUpdate {
    setDataForm: React.Dispatch<React.SetStateAction<IUseFormEgressRegister>>,
    contentTable: ITableDataEgressInside | undefined,
    isOpen: boolean | undefined
}

const useUpdate = ({ setDataForm, contentTable, isOpen }: IUseUpdate) => {
    useEffect(() => {
        setDataForm({
            category: contentTable ? createOption(contentTable.categoria, contentTable.id_categoria.toString()) : null,
            article: contentTable ? createOption(contentTable.articulo, contentTable.id_articulo.toString()) : null,
            description: contentTable ? contentTable.descripcion : '',
            amount: contentTable ? contentTable.cantidad.toString() : '',
            price: contentTable ? contentTable.monto.toString() : '',
            licitation: null,
            nro_renglon: contentTable ? contentTable.renglon.toString() : '',
            datePickerVencimiento: null,
            datePicker: contentTable ? transformToDateValue(contentTable.fec_compra) : null
        })
    }, [isOpen])

    let oldRegister

    if (contentTable) {
        oldRegister = {
            id: contentTable.id,
            id_article: contentTable.id_articulo,
            id_art_type: contentTable.id_categoria,
            name_art: contentTable.articulo,
            name_art_type: contentTable.categoria,
            description: contentTable.descripcion,
            amount: contentTable.monto,
            quantity: contentTable.cantidad,
            date: formatDate(contentTable.fec_compra.toString()),
            bid_number: contentTable.nro_licitacion,
            id_bidding: contentTable.id_licitacion,
            bid_date: contentTable.fec_licitacion,
            bidding_row: contentTable.renglon
        }
    }

    return { oldRegister }
}

export default useUpdate