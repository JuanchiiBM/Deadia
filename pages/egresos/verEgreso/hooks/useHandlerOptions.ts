import { Option } from "@/utils/globals";
import { useState } from "react";

export const useHandlerOptions = () => {
    const [disabledClassrooms, setDisabledClassrooms] = useState(true)
    const [valueSelects, setValueSelects] = useState<{
        categories: null | {
            value: string,
            label: string
        },
        articles: null | {
            value: string,
            label: string
        }
    }>({
        categories: {
            value: '0',
            label: 'Todas'
        },
        articles: null
    })

    const setDisabled = (value: Option) => {
        if (value.value == '0') {
            setDisabledClassrooms(true)
        } else {
            setDisabledClassrooms(false)
        }
        setValueSelects((prev) => ({
            ...prev,
            articles: null
        }))
    }

    const handleValueSelect = (select: 'categories' | 'articles', value: Option) => {
        setValueSelects((prev) => ({
            ...prev,
            [select]: value
        }))
        if (select == 'categories')
        setDisabled(value)
    }

    return {valueSelects, handleValueSelect, disabledClassrooms}
}