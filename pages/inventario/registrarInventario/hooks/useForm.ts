import { useState } from "react"
import { IUseFormInventoryRegister } from "@/helpers/interfaces";
import { RangeValue, DateValue } from "@nextui-org/react";
import { Option } from "@/utils/types/options";

const useForm = () => {
    const [dataForm, setDataForm] = useState<IUseFormInventoryRegister>({
        category: undefined,
        article: undefined,
        section: undefined,
        action: undefined,
        c_act: undefined,
        c_nueva: undefined
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