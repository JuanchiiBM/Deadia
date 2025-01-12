import { useEffect } from "react"
import { useContextRegister } from "@/context/contextRegister"

export const useResetData = (setFinalData: any) => {
    const { contentTable } = useContextRegister()

    useEffect(() => {
        setFinalData(undefined)
    }, [contentTable])
}