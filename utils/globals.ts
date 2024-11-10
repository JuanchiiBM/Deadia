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

export const POSTFunction = async (url: string, _dataObject: object) => {
    try {
        const response = await fetch(`https://sigma-backend-0ekn.onrender.com/${url}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('userToken')}`
            },
            body: JSON.stringify(_dataObject)
        });

        return response.json();
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

export const createOption = (label: string | null | undefined) => ({
    label,
    value: label?.toLowerCase().replace(/\W/g, ''),
})

export interface Option {
    readonly label: string | null | undefined;
    readonly value: string | null | undefined;
}

export const formatDate = (date: string) => {
    const formatedDate = date.split('-').reverse()
    return `${formatedDate[0]}-${formatedDate[1]}-${formatedDate[2]}`
}

export const formatDateFromDatePicker = (obj: { year: number, month: number, day: number }) => {
    return `${obj.year}-${obj.month}-${obj.day}`
}