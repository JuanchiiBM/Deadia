import { useState } from "react"
import { IUseFormEgressRegister } from "@/helpers/interfaces";
import { RangeValue, DateValue } from "@nextui-org/react";
import { Option } from "@/utils/globals";

const useForm = () => {
    const [dataForm, setDataForm] = useState<IUseFormEgressRegister>({
        category: undefined,
        article: undefined,
        description: undefined,
        amount: undefined,
        price: undefined,
        nro_renglon: undefined,
        licitation: undefined,
        datePicker: undefined,
        datePickerVencimiento: undefined
    })

    const handleInputChange = (field: string, value: string | RangeValue<any> | DateValue | undefined | Option | null) => {
        setDataForm(prev => ({
            ...prev,
            [field]: value,
        }))
    };

    return {dataForm, handleInputChange, setDataForm}
}

export default useForm