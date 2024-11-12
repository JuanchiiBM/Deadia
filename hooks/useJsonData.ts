import { GETFunction } from "@/utils/globals"
import { useEffect, useState } from "react"


export const useJsonData = ({ url }: { url: string}) => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [jsonData, setJsonData] = useState<any>(undefined)

    const getJsonData = async () => {
        setJsonData(await GETFunction(url, setIsLoading))
    }

    useEffect(() => {
        getJsonData()
    }, [])

    return {isLoading, jsonData}
}