import { useState, useEffect } from "react";
import { RangeValue } from "@react-types/shared";
import { getLocalTimeZone, parseDate, today, DateValue, startOfYear } from "@internationalized/date";
import { useInscriptionContext } from "./useInscriptionContext";


export const useDatePickerCharge = ({ selectDateRange }: { selectDateRange: () => Promise<void>}) => {
    const { setRefreshData } = useInscriptionContext()
    const [dateInitial, setDateInitial] = useState<RangeValue<any>>({
        start: startOfYear(today(getLocalTimeZone())),
        end: today(getLocalTimeZone()),
    });

    const handleDateInitial = (e: RangeValue<any>) => {
        setDateInitial(e)
        setRefreshData((prev) => prev = prev+1)
    }

    useEffect(() => {
        if (dateInitial && dateInitial.start != undefined) {
            selectDateRange()
        }
    }, [dateInitial])

    return { dateInitial, handleDateInitial }
}