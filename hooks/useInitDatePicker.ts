import { useEffect, useState } from "react";
import { getLocalTimeZone, today, startOfYear } from "@internationalized/date";
import { RangeValue } from '@nextui-org/react'

interface IUseInitDatePicker {
    setContentModal: React.Dispatch<React.SetStateAction<undefined>>
    onOpen: () => void
    selectDateRange: () => Promise<void>
    setRefreshData: React.Dispatch<React.SetStateAction<number>>
}

export const useInitDatePicker = ({selectDateRange, onOpen, setContentModal, setRefreshData}: IUseInitDatePicker) => {
    const [dateInitial, setDateInitial] = useState<RangeValue<any>>({
        start: startOfYear(today(getLocalTimeZone())),
        end: today(getLocalTimeZone()),
    });

    const resetModal = () => {
        setContentModal(undefined)
        onOpen()
    }

    const handlerDateInitial = (e: any) => {
        setDateInitial(e)
        setRefreshData((prev) => prev = prev+1)
    }

    useEffect(() => {
        if (dateInitial && dateInitial.start != undefined) {
            selectDateRange()
        }
    }, [dateInitial])

    return { handlerDateInitial, dateInitial, resetModal}
}