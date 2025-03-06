export const formatDate = (date: string) => {
    const formatedDate = date.split('/').reverse()
    return `${formatedDate[0]}-${formatedDate[1]}-${formatedDate[2]}`
}

export const formatDateSlash = (date: string) => {
    const formatedDate = date.split('-')
    return `${formatedDate[0]}-${formatedDate[1]}-${formatedDate[2]}`
}

export const formatDateFromDatePicker = (obj: { year: number, month: number, day: number }) => {
    return `${obj.year}-${obj.month}-${obj.day}`
}

export const formatDateT = (date: string) => {
    return date.split('T')[0]
}

export const formatDateToSpanish = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("es-ES", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(date); // Ejemplo: "01 ene 2025"
};

export const generateDateTimeArray = (minDate: number, maxDate: number, intervalMin: number): string[] => {
    const result: string[] = [];
    const start = new Date(minDate);
    const end = new Date(maxDate);

    while (start <= end) {
        result.push(start.toISOString());
        start.setMinutes(start.getMinutes() + intervalMin);
    }

    return result;
};