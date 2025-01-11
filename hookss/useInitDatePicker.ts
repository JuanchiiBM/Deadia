import { useEffect, useState } from "react";
import { getLocalTimeZone, today, startOfYear } from "@internationalized/date";
import { RangeValue } from '@nextui-org/react'

interface IUseInitDatePicker {
    selectDateRange: () => Promise<void>
    setRefreshData: React.Dispatch<React.SetStateAction<number>>
}

const useInitDatePicker = ({selectDateRange, setRefreshData}: IUseInitDatePicker) => {
    const [dateInitial, setDateInitial] = useState<RangeValue<any>>({
        start: startOfYear(today(getLocalTimeZone())),
        end: today(getLocalTimeZone()),
    });

    const handlerDateInitial = (e: any) => {
        setDateInitial(e)
        setRefreshData((prev) => prev = prev+1)
    }

    useEffect(() => {
        if (dateInitial && dateInitial.start != undefined) {
            selectDateRange()
        }
    }, [dateInitial])

    return { handlerDateInitial, dateInitial}
}

export default useInitDatePicker