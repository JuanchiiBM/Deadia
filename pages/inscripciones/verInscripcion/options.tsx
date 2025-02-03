import React, { useEffect, useRef, useState } from 'react'
import Select, { SelectInstance } from 'react-select';
import { DateRangePicker } from "@heroui/react";
import { RangeValue } from "@react-types/shared";
import { colourStyles } from '@/styles/selects';
import { I18nProvider } from "@react-aria/i18n";
import { getLocalTimeZone, parseDate, today, DateValue, startOfYear } from "@internationalized/date";
import { useDatePickerCharge } from './hooks/useDatePickerCharge';
import { useChargeOptions } from './hooks/useChargeOptions';
import { useContextView } from '@/context/contextView';
import { useHandlerOptions } from './hooks/useHandlerOptions';

interface IOptionsVerInsc {
    setValueOption: React.Dispatch<React.SetStateAction<{
        value: string;
        type: string;
    }>>
    dateRef: React.MutableRefObject<any>
    selectDateRange: () => Promise<void>
}

const Options: React.FC<IOptionsVerInsc> = ({ setValueOption, dateRef, selectDateRange }) => {
    const { jsonIsLoading } = useContextView()
    const { valueSelects, handleValueSelect, disabledClassrooms } = useHandlerOptions()
    const { dateInitial, handleDateInitial } = useDatePickerCharge({selectDateRange}) 
    const { options } = useChargeOptions()
    
    return (
        <div className='w-full my-[50px] h-[110px] bg-background-200 flex justify-around p-5 rounded-lg shadow-md'>
            <div className='flex flex-col'>
                <label id='label-dependency' htmlFor="select-dependency">Dependencia:</label>
                <Select maxMenuHeight={300} isDisabled={jsonIsLoading} aria-labelledby='label-dependency' value={valueSelects.deps} onChange={(e: any) => {setValueOption({value: e.value, type: 'Deps'}); handleValueSelect('deps', e)}} defaultValue={options.deps[0]} options={options.deps} className='w-[170px]' placeholder='Dependencias' noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} isSearchable styles={colourStyles}></Select>
            </div>
            <div>
                <I18nProvider locale='es-ES'>
                    <label htmlFor="datepicker">Seleccionar Rango:</label>
                    <DateRangePicker isDisabled={jsonIsLoading} visibleMonths={2} defaultValue={undefined} ref={dateRef} onChange={(e: any) => handleDateInitial(e)} value={dateInitial} id='datepicker' labelPlacement='outside' maxValue={today(getLocalTimeZone())} className="max-w-xs transition-all" classNames={{
                        input: 'bg-background hover:bg-background focus:bg-background',
                        inputWrapper: 'bg-background hover:!bg-background focus:bg-background rounded-md',
                    }} calendarProps={{ classNames: { headerWrapper: "bg-background-200", gridHeader: "bg-background-200" } }} />
                </I18nProvider>
            </div>
            <div className='flex flex-col'>
                <label id='label-curse' htmlFor="select-curso">Curso:</label>
                <Select maxMenuHeight={300} isDisabled={jsonIsLoading || disabledClassrooms} aria-labelledby='label-curse' value={valueSelects.grades} onChange={(e: any) => {setValueOption({value: e.value, type: 'Grades'});  handleValueSelect('grades', e)}} options={options.grades} className='w-[170px]' placeholder='Cursos' noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} isSearchable styles={colourStyles}></Select>
            </div>
        </div>
    )
}

export default Options