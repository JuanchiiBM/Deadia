import { Option } from "@/utils/globals";
import { useState } from "react";


interface ISetValueOption {
    value: string;
    type: string;
}

export const useHandlerOptions = () => {
    const [disabledClassrooms, setDisabledClassrooms] = useState(true)
    const [valueSelects, setValueSelects] = useState<{
        deps: null | {
            value: string,
            label: string
        },
        grades: null | {
            value: string,
            label: string
        }
    }>({
        deps: {
            value: '0',
            label: 'Todas'
        },
        grades: null
    })

    const setDisabled = (value: Option) => {
        if (value.value == '0') {
            setDisabledClassrooms(true)
        } else {
            setDisabledClassrooms(false)
        }
        setValueSelects((prev) => ({
            ...prev,
            grades: null
        }))
    }

    const handleValueSelect = (select: 'deps' | 'grades', value: Option) => {
        setValueSelects((prev) => ({
            ...prev,
            [select]: value
        }))
        if (select == 'deps')
        setDisabled(value)
    }

    return {valueSelects, handleValueSelect, disabledClassrooms}
}