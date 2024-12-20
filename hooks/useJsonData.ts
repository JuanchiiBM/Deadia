import { GETFunction } from "@/utils/globals"
import { useEffect, useState } from "react"
import { useUpdateContext } from "./inscripciones/registrarInscripcion/useUpdateContext"


export const useJsonData = ({ url, refreshData }: { url: string | undefined, refreshData?: number}) => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [jsonData, setJsonData] = useState<any>(undefined)
    const getJsonData = async () => {
        if (url && !url.includes('undefined')) {
            console.log(url)
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

    return {isLoading, jsonData, setIsLoading}
}