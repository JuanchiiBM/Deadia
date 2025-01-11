import { formatDate } from "@/utils/helpers/formatDates"

const useSetDataObject = ({ dataForm }: {dataForm: any}) => {
    
    const _dataObject = {
        id_article: !Number.isNaN(parseInt(dataForm.article?.value || '')) ? parseInt(dataForm.article?.value || '') : '',
        id_art_type: !Number.isNaN(parseInt(dataForm.category?.value || '')) ? parseInt(dataForm.category?.value || '') : '',
        name_art: dataForm.article?.label,
        name_art_type: dataForm.category?.label,
        description: dataForm.description,
        amount: parseInt(dataForm.price || ''),
        quantity: parseInt(dataForm.amount || ''),
        date: dataForm.datePicker?.toString(),
        id_bidding: !Number.isNaN(parseInt(dataForm.licitation?.value || '')) ? parseInt(dataForm.licitation?.value || '') : '',
        bid_number: dataForm.licitation?.label,
        bid_date: dataForm.licitation?.date && formatDate(dataForm.licitation?.date),
        bidding_row: dataForm.nro_renglon,
        date_vencimiento: dataForm.datePickerVencimiento?.toString(),
        status: 0
    }

    return { _dataObject }
}

export default useSetDataObject