import { DateValue } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";


export const GETFunctionFake = async (value: string) => {
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

export const GETFunction = async (url: string, loader?: any) => {
    try {
        const response = await fetch(`https://sigma-backend-0ekn.onrender.com/${url}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('userToken')}`
            }
        });
        const finalResponse = response.json()
        if (loader) loader(false)

        console.log(url)
        console.log(finalResponse)
        console.log('-_-_-_-_-_-_-_-_-_-_-_-_')

        return finalResponse;
    } catch (error) {
        console.error("Error:", error);
        return []; // Retorna un string vacío en caso de error
    }
}

export const POSTFunction = async (url: string, _dataObject: any, loader?: any) => {
    try {
        const response = await fetch(`https://sigma-backend-0ekn.onrender.com/${url}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('userToken')}`
            },
            body: JSON.stringify(_dataObject)
        });
        const finalResponse = response.json()
        if (loader) loader(false)

        console.log(url)
        console.log(finalResponse)
        console.log('-_-_-_-_-_-_-_-_-_-_-_-_')

        return finalResponse;
    } catch (error) {
        console.error("Error:", error);
        return []; // Retorna un string vacío en caso de error
    }
}

export const PUTFunction = async (url: string, _dataObject: any, loader?: any) => {
    try {
        const response = await fetch(`https://sigma-backend-0ekn.onrender.com/${url}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('userToken')}`
            },
            body: JSON.stringify(_dataObject)
        });
        const finalResponse = await response.json()
        if (loader) loader(false)

        console.log(url)
        console.log(finalResponse)
        console.log('-_-_-_-_-_-_-_-_-_-_-_-_')

        return finalResponse;
    } catch (error) {
        console.error("Error:", error);
        return []; // Retorna un string vacío en caso de error
    }
}

export const DELETEFunction = async (url: string) => {
    try {
        const response = await fetch(`https://sigma-backend-0ekn.onrender.com/${url}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('userToken')}`
            },
        });

        return response.json();
    } catch (error) {
        return error; // Retorna un string vacío en caso de error
    }
}

export const createOption = (label: string | null | undefined, value?: string) => ({
    label: label,
    value: value ? value : label?.toLowerCase().replace(/\W/g, ''),
}) as Option

export const selectOption = (label: string) => {

}

export interface Option {
    readonly label: string | null | undefined;
    readonly value: string | null | undefined;
}

export const formatDate = (date: string) => {
    const formatedDate = date.split('/').reverse()
    return `${formatedDate[0]}-${formatedDate[1]}-${formatedDate[2]}`
}

export const formatDateFromDatePicker = (obj: { year: number, month: number, day: number }) => {
    return `${obj.year}-${obj.month}-${obj.day}`
}

export const transformToDateValue = (dateString: string): DateValue => {
    // Convierte el string `dd/mm/yyyy` a `yyyy-mm-dd`
    const [day, month, year] = dateString.split("/").map(Number);
    const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
  
    // Usa parseDate para convertirlo a un DateValue
    return parseDate(formattedDate);
  };