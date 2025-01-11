export const capitalizeFirstLetter = (text: string) => {
    if (!text) return ''; // Manejar texto vacío o nulo
    return text.charAt(0).toUpperCase() + text.slice(1);
}