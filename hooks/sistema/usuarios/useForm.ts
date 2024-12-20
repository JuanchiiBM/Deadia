import { useState } from "react"
import { IUseFormUsers } from "@/helpers/interfaces";
import { RangeValue, DateValue } from "@nextui-org/react";
import { Option } from "@/utils/globals";



export const useForm = () => {
    const [dataForm, setDataForm] = useState<IUseFormUsers>({
        name: '',
        lastname: '',
        mail: '',
        user: '',
        password: '',
        profile: null,
        dependency: null
    })

    const handleInputChange = (field: string, value: string | RangeValue<any> | DateValue | undefined | Option | null) => {
        setDataForm(prev => ({
            ...prev,
            [field]: value,
        }))
    };

    return {dataForm, handleInputChange, setDataForm}
}