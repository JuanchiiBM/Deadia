import { URLBack } from "../enums/urls";

export const GETFunction = async (url: string, loader?: any) => {
    try {
        const response = await fetch(`${URLBack}${url}`, {
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
        console.log(_dataObject)
        console.log('AAAAAAAAAAAAAA')
        const response = await fetch(`${URLBack}${url}`, {
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
        const response = await fetch(`${URLBack}${url}`, {
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
        const response = await fetch(`${URLBack}${url}`, {
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
