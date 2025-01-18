import { useEffect, useState } from "react"
import { RangeValue, DateValue } from "@heroui/react";
import { Option } from "@/utils/types/options";

const useForm = () => {
    const [dataForm, setDataForm] = useState<any>({
        name: '',
        lastname: '',
        mail: '',
        user: '',
        password: '',
        profile: null,
        dependency: null
    })

    const handleInputChange = (field: string, value: string | RangeValue<any> | DateValue | undefined | Option | null) => {
        setDataForm((prev: any) => ({
            ...prev,
            [field]: value,
        }))
    };

    useEffect(() => {
        console.log(dataForm)
    }, [dataForm])

    return {dataForm, handleInputChange, setDataForm}
}

export default useForm