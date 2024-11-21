import { useState, useRef } from "react"

export const useDatePickerInscription = () => {
    const [dateSelected, setDateSelected] = useState<any[]>()
    const dateRef = useRef<any>()

    const selectDateRange = async () => {
        await setDateSelected(dateRef.current.innerText.split('\n').join('').split('-').map((date: any) => {
            const partsOfDate = date.split('/').reverse()
            partsOfDate[1].length == 1 ? partsOfDate[1] = `0${partsOfDate[1]}` : null
            partsOfDate[2].length == 1 ? partsOfDate[2] = `0${partsOfDate[2]}` : null
            return `${partsOfDate[0]}-${partsOfDate[1]}-${partsOfDate[2]}`
        }))
    }

    return {dateSelected, dateRef, selectDateRange}
}