import { useState } from "react";

export const useProfileForm = () => {
    const [profileForm, setProfileForm] = useState({
        nombre: '',
        descripcion: '',
        permisos: []
    })

    const handleInputChange = (field: string, value: string) => {
        setProfileForm(prev => ({
            ...prev,
            [field]: value,
        }))
    };

    return {
        profileForm,
        handleInputChange,
    };
};