import { formatDateFromDatePicker } from "@/utils/helpers/formatDates"
import { today, getLocalTimeZone } from "@internationalized/date"

const useSetDataObject = ({ dataForm }: any) => {
    const _dataObject = {
        id_classroom: parseInt(dataForm?.classroom?.value || ''),
        id_dependency: parseInt(dataForm?.dependency?.value || ''),
        amount: parseInt(dataForm?.amount?.label?.split('$')[1] || ''),
        date: dataForm.date && formatDateFromDatePicker(today(getLocalTimeZone())),
        dni: dataForm.dni,
        name: dataForm.name,
        last_name: dataForm.lastname,
        email: dataForm.mail,
        id_category: parseInt(dataForm?.category?.value || ''),
        id_pupil: !Number.isNaN(parseInt(dataForm?.id_pupil || '')) ? parseInt(dataForm?.id_pupil || '') : '',

        code: dataForm.classroom?.label,
        begin_date: dataForm.begin_date && formatDateFromDatePicker(dataForm.datePicker.start),
        end_date: dataForm.end_date && formatDateFromDatePicker(dataForm.datePicker.end),
        id_grade_type: dataForm?.curse?.value ? parseInt(dataForm?.curse?.value || '') : null,
        id_rank: dataForm?.grade?.value ? parseInt(dataForm?.grade?.value || '') : null,
        id_destination: dataForm?.destination?.value ? parseInt(dataForm?.destination?.value || '') : null,
        status: 0
    }

    return { _dataObject }
}

export default useSetDataObject