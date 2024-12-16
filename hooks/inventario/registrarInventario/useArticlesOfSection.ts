import { IUseFormInventoryRegister } from "@/helpers/interfaces";
import { useJsonData } from "@/hooks/useJsonData";
import { useEffect, useState } from "react";


export const useArtcilesOfSection = (dataForm: IUseFormInventoryRegister) => {
    const [url, setUrl] = useState<string | undefined>()
    const { jsonData, isLoading } = useJsonData({url: url})

    useEffect(() => {
        if (dataForm.section?.value && dataForm.article?.value) {
            setUrl(`api/inventorybalance?id_dependency=${dataForm.section?.value}&id_article=${dataForm.article?.value}`)
        }
    }, [dataForm.section, dataForm.article])
    
    return {jsonData, isLoading}
}