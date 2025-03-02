import { useEffect, useState } from "react"
import { RangeValue, DateValue } from "@heroui/react";
import { Option } from "@/utils/types/options";

const useForm = () => {
    const [dataForm, setDataForm] = useState<any>({
        dni: undefined,
        name: undefined,
        lastname: undefined,
        mail: undefined,
        category: undefined,
        grade: undefined,
        destination: undefined,
        classroom: undefined,
        curse: undefined,
        id_pupil: undefined,
        dependency: undefined,
        amount: undefined,
        date: undefined,

        datePicker: {
            start: null,
            end: null
        }
    })

    const handleInputChange = (field: string, value: string | RangeValue<any> | DateValue | undefined | Option | null) => {
        setDataForm((prev: any) => ({
            ...prev,
            [field]: value,
        }))
    };

    return {dataForm, handleInputChange, setDataForm}
}

export default useForm