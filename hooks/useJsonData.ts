import { GETFunction } from "@/utils/globals"
import { useEffect, useState } from "react"
import { useUpdateContext } from "./inscripciones/registrarInscripcion/useUpdateContext"


export const useJsonData = ({ url }: { url: string}) => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [jsonData, setJsonData] = useState<any>(undefined)
    const { refreshData } = useUpdateContext()

    const getJsonData = async () => {
        if (!url.includes('undefined')) {
            setIsLoading(true)
            const json = await GETFunction(url, setIsLoading)
            setJsonData(json)
        }
    }

    useEffect(() => {
        getJsonData()
    }, [url])

    
    useEffect(() => {
        getJsonData()
    }, [refreshData])

    return {isLoading, jsonData}
}