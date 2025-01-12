import { useContextRegister } from "@/context/contextRegister"
import { getLocalTimeZone, today } from "@internationalized/date";
import { formatDateFromDatePicker } from "@/utils/helpers/formatDates";

const useSetDataObject = ({ dataForm }: any) => {

    const _dataObject = {
        id_article: !Number.isNaN(parseInt(dataForm.article?.value || '')) ? parseInt(dataForm.article?.value || '') : '',
        id_dependency: !Number.isNaN(parseInt(dataForm.section?.value || '')) ? parseInt(dataForm.section?.value || '') : '',
        quantity: Number(dataForm.action) > 0 ? Number(dataForm.action) : Number(dataForm.action) * -1,
        date: formatDateFromDatePicker(today(getLocalTimeZone())),
        type: Number(dataForm.action) > 0 ? 'assign' : 'consume',
        status: 0
    }

    return { _dataObject }
}

export default useSetDataObject