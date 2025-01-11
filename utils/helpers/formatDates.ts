export const formatDate = (date: string) => {
    const formatedDate = date.split('/').reverse()
    return `${formatedDate[0]}-${formatedDate[1]}-${formatedDate[2]}`
}