import { useState, useEffect } from "react"
import { IDataUsersRegister } from "@/helpers/interfaces"
import { Option } from "@/utils/globals"
import useJsonData from "@/hooks/useJsonData";

export const useSelectOptions = () => {
    const {jsonData, isLoading}: {jsonData: IDataUsersRegister, isLoading: boolean} = useJsonData({url: 'api/user/register/form'})
    const [options, setOptions] = useState<{
        profile: Option[] | undefined,
        deps: Option[] | undefined,
    }>({profile: undefined, deps: undefined})

    const chargueOptionsProfiles = async () => {
        const optionsProfiles = jsonData.profiles.map((opt) => ({
            value: opt.id.toString(),
            label: opt.perfil
        })) as Option[]
        
        setOptions(prev => ({
            ...prev,
            profile: optionsProfiles,
            //article: optionsDeps,
        })) 
    }

    const chargueOptionsDeps = async () => {
        const optionsDeps = jsonData.deps.map((opt) => ({
            value: opt.id.toString(),
            label: opt.dependencia
        })) as Option[]
        
        setOptions(prev => ({
            ...prev,
            deps: optionsDeps,
        })) 
    }

    useEffect(() => {
        if (jsonData) {
            chargueOptionsProfiles()
            chargueOptionsDeps()
        }
    }, [jsonData])

    return {options, jsonData, isLoading}
}