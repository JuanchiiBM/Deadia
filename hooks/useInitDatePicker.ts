import { useEffect, useState } from "react";
import { getLocalTimeZone, today, startOfYear } from "@internationalized/date";
import { RangeValue } from '@nextui-org/react'

interface IUseInitDatePicker {
    setContentModal: React.Dispatch<React.SetStateAction<undefined>>
    onOpen: () => void
    selectDateRange:  () => Promise<void>
}

export const useInitDatePicker = ({selectDateRange, onOpen, setContentModal}: IUseInitDatePicker) => {
    const [dateInitial, setDateInitial] = useState<RangeValue<any>>({
        start: startOfYear(today(getLocalTimeZone())),
        end: today(getLocalTimeZone()),
    });

    const resetModal = () => {
        setContentModal(undefined)
        onOpen()
    }

    useEffect(() => {
        if (dateInitial && dateInitial.start != undefined) {
            selectDateRange()
        }
    }, [dateInitial])

    return { setDateInitial, dateInitial, resetModal}
}