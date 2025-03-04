import { GETFunctionConfig } from "@/utils/helpers/httpsFunctions"
import { useEffect, useState } from "react"

const useJsonDataConfig = ({ url, refreshData, xconfig, xreactivate }: { url: string | undefined, refreshData?: number, xconfig:'true' | 'false', xreactivate:'true' | 'false'}) => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [jsonData, setJsonData] = useState<any>(undefined)
    const getJsonData = async () => {
        if (url && !url.includes('undefined')) {
            console.log(url)
            setIsLoading(true)
            const json = await GETFunctionConfig(url, xconfig, xreactivate, setIsLoading)
            setJsonData(json)
        }
    }

    useEffect(() => {
        console.log('useJsonDataConfig')
        getJsonData()
    }, [url, refreshData])

    return {isLoading, jsonData, setIsLoading}
}

export default useJsonDataConfig