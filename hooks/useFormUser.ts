import { useState } from "react";

export const useFormUser = () => {
    const [userForm, setUserForm] = useState({
        nombre: '',
        apellido: '',
        usuario: '',
        mail: '',
        perfil: null,
        dependencia: null,
    })

    const handleInputChange = (field: string, value: string) => {
        setUserForm(prev => ({
            ...prev,
            [field]: value,
        }))
    };

    return {
        userForm,
        handleInputChange,
    };
};