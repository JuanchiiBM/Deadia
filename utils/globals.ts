export const GETFunction = async (value: string) => {
    try {
        const response = await fetch(`http://localhost:3000/${value}`, {
            method: "GET",
        });
        return response.json();
    } catch (error) {
        console.error("Error:", error);
        return []; // Retorna un string vacío en caso de error
    }
}

export const createOption = (label: string | null | undefined) => ({
    label,
    value: label?.toLowerCase().replace(/\W/g, ''),
})

export interface Option {
    readonly label: string | null | undefined;
    readonly value: string | null | undefined;
}