import { formatDate } from "@/utils/globals"
import { today, getLocalTimeZone } from "@internationalized/date"

const useSetDataObject = ({ dataForm }: any) => {
    const _dataObject = {
        id_classroom: parseInt(dataForm?.classroom?.value || ''),
        id_dependency: parseInt(dataForm?.dependency?.value || ''),
        amount: parseInt(dataForm?.amount?.label?.split('$')[1] || ''),
        date: dataForm.date && formatDate(dataForm.date),
        dni: dataForm.dni,
        name: dataForm.name,
        last_name: dataForm.lastname,
        email: dataForm.mail,
        id_category: parseInt(dataForm?.category?.value || ''),
        id_pupil: !Number.isNaN(parseInt(dataForm?.id_pupil || '')) ? parseInt(dataForm?.id_pupil || '') : '',
        
        code: dataForm.classroom?.label,
        begin_date: dataForm.begin_date && formatDate(dataForm.begin_date),
        end_date: dataForm.end_date && formatDate(dataForm.begin_date),
        id_grade_type: dataForm?.curse?.value ? parseInt(dataForm?.curse?.value || '') : null,
        id_rank: dataForm?.grade?.value ? parseInt(dataForm?.grade?.value || '') : null,
        id_destination: dataForm?.destination?.value ? parseInt(dataForm?.destination?.value || '') : null,
        status: 0
    }
    console.log(_dataObject)

    return { _dataObject }
}

export default useSetDataObject