import { GETFunction } from "@/utils/globals";
import { useEffect, useState } from "react";

export const useUserSelectOptions = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [options, setOptions] = useState({
        perfil: [
            {}
        ],
        dependencia: [
            {}
        ]
    })

    useEffect(() => {
        const _data = GETFunction('', setIsLoading)
        //const pushOptions = _data.map()
        //setOptions()
    }, [])

    return {options, isLoading}
}