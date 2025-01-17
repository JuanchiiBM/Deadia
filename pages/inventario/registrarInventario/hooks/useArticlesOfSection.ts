import { IUseFormInventoryRegister } from "@/helpers/interfaces";
import useJsonData from "@/hooks/useJsonData";
import { useEffect, useState } from "react";

interface IData {
    articulo: string
    dependencia: string
    fecha_ultima_compra: string
    fecha_ultimo_movimiento: string
    saldo: number
    saldo_restante: number
}

export const useArtcilesOfSection = (dataForm: IUseFormInventoryRegister) => {
    const [url, setUrl] = useState<string | undefined>()
    const [refreshData, setRefreshData] = useState<number>(0)
    const { jsonData, isLoading, setIsLoading } = useJsonData({url: url, refreshData: refreshData})
    const [finalData, setFinalData] = useState<IData>()

    useEffect(() => {
        console.log('asdasdasd')
        if (dataForm.section?.value && dataForm.article?.value) {
            const prevUrl = url
            setUrl(`api/inventorybalance?id_dependency=${dataForm.section?.value}&id_article=${dataForm.article?.value}`)
            if (prevUrl == url) setRefreshData(refreshData + 1)
        }
    }, [dataForm.section, dataForm.article])

    useEffect(() => {
        if (jsonData)
        setFinalData(jsonData.list.balance[0])
    }, [jsonData])

    useEffect(() => {
        setIsLoading(false)  
    }, [])
    
    return {finalData, isLoading, setFinalData}
}