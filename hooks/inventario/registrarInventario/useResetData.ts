import { useEffect } from "react"

export const useResetData = (setFinalData: any, isOpen: boolean | undefined) => {
    useEffect(() => {
        setFinalData(undefined)
    }, [isOpen])
}