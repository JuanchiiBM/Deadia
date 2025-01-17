import { GETFunction } from "@/utils/helpers/httpsFunctions"
import { useEffect, useState } from "react"

const useJsonData = ({ url, refreshData }: { url: string | undefined, refreshData?: number}) => {
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
        console.log('useJsonData')
        getJsonData()
    }, [url, refreshData])

    return {isLoading, jsonData, setIsLoading}
}

export default useJsonData