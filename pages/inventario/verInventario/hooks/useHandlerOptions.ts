import { Option } from "@/utils/globals";
import { useState } from "react";

export const useHandlerOptions = () => {
    const [disabledClassrooms, setDisabledClassrooms] = useState(true)
    const [valueSelects, setValueSelects] = useState<{
        dependencies: null | {
            value: string,
            label: string
        },
        categories: null | {
            value: string,
            label: string
        }
    }>({
        dependencies: {
            value: '0',
            label: 'Todas'
        },
        categories: null
    })

    const setDisabled = (value: Option) => {
        if (value.value == '0') {
            setDisabledClassrooms(true)
        } else {
            setDisabledClassrooms(false)
        }
        setValueSelects((prev) => ({
            ...prev,
            categories: null
        }))
    }

    const handleValueSelect = (select: 'dependencies' | 'categories', value: Option) => {
        setValueSelects((prev) => ({
            ...prev,
            [select]: value
        }))
        if (select == 'dependencies')
        setDisabled(value)
    }

    return {valueSelects, handleValueSelect, disabledClassrooms}
}