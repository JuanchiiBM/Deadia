import { useState } from "react"
import { IUseFormEgressRegister } from "@/helpers/interfaces";
import { RangeValue, DateValue } from "@nextui-org/react";
import { Option } from "@/utils/globals";



export const useForm = () => {
    const [dataForm, setDataForm] = useState<IUseFormEgressRegister>({
        category: undefined,
        article: undefined,
        description: undefined,
        amount: undefined,
        price: undefined,
        datePicker: undefined
    })

    const handleInputChange = (field: string, value: string | RangeValue<any> | DateValue | undefined | Option | null) => {
        setDataForm(prev => ({
            ...prev,
            [field]: value,
        }))
    };

    return {dataForm, handleInputChange, setDataForm}
}