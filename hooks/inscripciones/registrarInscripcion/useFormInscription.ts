import { useState } from "react"
import { IUseFormInscription } from "@/helpers/interfaces";
import { RangeValue, CalendarDate } from "@nextui-org/react";
import { Option } from "@/utils/globals";

export const useFormInscription = () => {
    const [studentInfo, setStudentInfo] = useState<IUseFormInscription>({
        dni: undefined,
        name: undefined,
        lastname: undefined,
        mail: undefined,
        category: undefined,
        grade: undefined,
        classroom: undefined,
        curse: undefined,
        id_pupil: undefined,
        dependency: undefined,
        amount: undefined,
        datePicker: {
            start: null,
            end: null
        }
    })

    const handleInputChange = (field: string, value: string | RangeValue<any> | undefined | Option | null) => {
        setStudentInfo(prev => ({
            ...prev,
            [field]: value,
        }))
    };

    return {studentInfo, handleInputChange, setStudentInfo}
}