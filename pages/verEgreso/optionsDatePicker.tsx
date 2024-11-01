import React, { useState } from 'react'
import { DateRangePicker } from '@nextui-org/react'
import {RangeValue} from "@react-types/shared";
import { I18nProvider } from "@react-aria/i18n";
import {getLocalTimeZone, parseDate, today, DateValue, startOfYear} from "@internationalized/date";

interface IOptionsVerEgresoDatePicker {
    dateRef: any
}

const OptionsVerEgresoDatePicker: React.FC<IOptionsVerEgresoDatePicker> = ({ dateRef }) => {
    const [dateInitial, setDateInitial] = useState<RangeValue<any>>({
        start: startOfYear(today(getLocalTimeZone())),
        end: today(getLocalTimeZone()),
      });

  return (
    <div>
        <I18nProvider locale='es-ES'>
            <label htmlFor="datepicker">Seleccionar Rango:</label>
            <DateRangePicker visibleMonths={2} ref={dateRef} defaultValue={undefined} onChange={setDateInitial} value={dateInitial} id='datepicker' labelPlacement='outside' maxValue={today(getLocalTimeZone())} className="max-w-xs transition-all" classNames={{
                input: 'bg-background hover:bg-background focus:bg-background',
                inputWrapper: 'bg-background hover:!bg-background focus:bg-background rounded-md',
            }} calendarProps={{classNames: { headerWrapper: "bg-background-200", gridHeader: "bg-background-200"}}} />
        </I18nProvider>
    </div>
  )
}

export default OptionsVerEgresoDatePicker