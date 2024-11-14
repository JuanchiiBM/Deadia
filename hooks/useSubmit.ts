import { POSTFunction } from "@/utils/globals"

export const useSubmit = () => {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, userForm: {}) => {
        e.preventDefault()
        const response = await POSTFunction('', userForm)
        //Logica sweetAlerts
    }

    return {handleSubmit}
}