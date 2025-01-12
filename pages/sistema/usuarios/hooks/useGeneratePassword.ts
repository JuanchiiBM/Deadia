import { IUseFormUsers } from "@/helpers/interfaces";

export const useGeneratePassword = (handleInputChange: (field: string, value: any) => void) => {
    const generatePassword = () => {
        const length = 8;
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let password = "";

        // Ensure at least one lowercase letter
        password += "abcdefghijklmnopqrstuvwxyz".charAt(Math.floor(Math.random() * 26));
        // Ensure at least one uppercase letter
        password += "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor(Math.random() * 26));
        // Ensure at least one number
        password += "0123456789".charAt(Math.floor(Math.random() * 10));

        for (let i = password.length; i < length; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }

        // Shuffle the password to ensure randomness
        password = password.split('').sort(() => 0.5 - Math.random()).join('');

        handleInputChange('password', password);
        return password;
    };

    return generatePassword;
};