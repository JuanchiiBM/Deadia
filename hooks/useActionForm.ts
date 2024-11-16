import { useState } from "react";

export const useActionForm = () => {
    const [actionForm, setActionForm] = useState({
        nombre: '',
        descripcion: '',
        permisos: []
    })

    const handleInputChange = (field: string, value: string) => {
        setActionForm(prev => ({
            ...prev,
            [field]: value,
        }))
    };

    return {
        actionForm,
        handleInputChange,
    };
};