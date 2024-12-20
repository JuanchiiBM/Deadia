import { useState } from "react";

export const usePasswordValidation = () => {
    const [password, setPassword] = useState('');

    const validatePassword = (value: string) => {
        const hasEnoughLength = value.length >= 8;
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumber = /\d/.test(value);

        if (!hasEnoughLength) {
            return 'La contraseña debe contener al menos 8 caracteres.';
        } else if (!hasUpperCase) {
            return 'La contraseña debe contener al menos una letra mayúscula.';
        } else if (!hasLowerCase) {
            return 'La contraseña debe contener al menos una letra minúscula.';
        } else if (!hasNumber) {
            return 'La contraseña debe contener al menos un número.';
        }

        return null;
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>, handleInputChange: (type: 'password', e: string) => void) => {
        setPassword(e.target.value);
        handleInputChange('password', e.target.value);
    };

    return { password, handlePasswordChange, validatePassword };
};