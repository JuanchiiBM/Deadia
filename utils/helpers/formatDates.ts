export const formatDate = (date: string) => {
    const formatedDate = date.split('/').reverse()
    return `${formatedDate[0]}-${formatedDate[1]}-${formatedDate[2]}`
}

export const formatDateFromDatePicker = (obj: { year: number, month: number, day: number }) => {
    return `${obj.year}-${obj.month}-${obj.day}`
}