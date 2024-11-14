import React, { useEffect, useRef, useState } from 'react'
import Select, { SelectInstance } from 'react-select';
import { DateRangePicker } from "@nextui-org/react";
import { RangeValue } from "@react-types/shared";
import { colourStyles } from '@/helpers/selects';
import { I18nProvider } from "@react-aria/i18n";
import { getLocalTimeZone, parseDate, today, DateValue, startOfYear } from "@internationalized/date";

interface ISelects {
    changeJson: (value: string, ret?: boolean) => void
    changeJsonForCurse: (value: string) => void
    changeRange: () => void
    selectDateRange: () => void
    dateRef: any,
    optionsDeps: { value: string; label: string; }[]
    lastTable: string
    tableLoader: boolean
}

const Selects: React.FC<ISelects> = ({ changeJson, changeJsonForCurse, changeRange, dateRef, optionsDeps, lastTable, tableLoader, selectDateRange }) => {
    const cursoSelect = useRef<SelectInstance<any> | null>(null);
    const depSelect = useRef<SelectInstance<any> | null>(null);
    const [dateInitial, setDateInitial] = useState<RangeValue<any>>({
        start: startOfYear(today(getLocalTimeZone())),
        end: today(getLocalTimeZone()),
    });
    const [isDisabled, setIsDisabled] = useState(true)
    const [isDisabledDatePicker, setIsDisabledDatePicker] = useState(false)
    const [optCursos, setOptCursos] = useState([])
    let optionsCursos

    const disabledCursos = (val: string, data: any) => {
        if (cursoSelect.current && val != '0') {
            setIsDisabled(false)
            console.log(data)
            optionsCursos = data.map((opt: any, index: number) => {
                return {
                    value: opt.id,
                    type: 'curso',
                    label: `${opt.code} | `
                };
            });
            cursoSelect.current.setValue('0', 'select-option')
            setOptCursos(optionsCursos)
        }
        else if (cursoSelect.current) {
            setIsDisabled(true)
            cursoSelect.current.setValue('0', 'select-option')
        }
    }

    const changeDependency = async (e: any) => {
        if (e.value != undefined) {
            const data = await changeJson(e.value, true)
            setIsDisabledDatePicker(false)
            disabledCursos(e.value, data)
        }
    }


    const changeCurse = async (e: any) => {
        if (e.value != undefined) {
            setIsDisabledDatePicker(true)
            await changeJsonForCurse(e.value)
        }
    }

    const changeDatePicker = (e: RangeValue<any>) => {
            setDateInitial(e)
    }

    useEffect(() => {
        if (dateInitial && dateInitial.start != undefined) {
            selectDateRange()
        }
    }, [dateInitial])

    return (
        <div className='w-full my-[50px] h-[110px] bg-background-200 flex justify-around p-5 rounded-lg shadow-md'>
            <div className='flex flex-col'>
                <label id='label-dependency' htmlFor="select-dependency">Dependencia:</label>
                <Select aria-labelledby='label-dependency' className='w-[170px]' placeholder='Dependencias' ref={depSelect} isDisabled={tableLoader} noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} onChange={changeDependency} options={optionsDeps} defaultValue={optionsDeps[0]} isSearchable styles={colourStyles}></Select>
            </div>
            <div>
                <I18nProvider locale='es-ES'>
                    <label htmlFor="datepicker">Seleccionar Rango:</label>
                    <DateRangePicker visibleMonths={2} ref={dateRef} defaultValue={undefined} isDisabled={tableLoader || isDisabledDatePicker} onChange={(e) => changeDatePicker(e)} value={dateInitial} id='datepicker' labelPlacement='outside' maxValue={today(getLocalTimeZone())} className="max-w-xs transition-all" classNames={{
                        input: 'bg-background hover:bg-background focus:bg-background',
                        inputWrapper: 'bg-background hover:!bg-background focus:bg-background rounded-md',
                    }} calendarProps={{ classNames: { headerWrapper: "bg-background-200", gridHeader: "bg-background-200" } }} />
                </I18nProvider>
            </div>
            <div className='flex flex-col'>
                <label id='label-curse' htmlFor="select-curso">Curso:</label>
                <Select aria-labelledby='label-curse' className='w-[170px]' isDisabled={isDisabled || tableLoader} ref={cursoSelect} placeholder='Cursos' noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} onChange={changeCurse} options={optCursos} defaultValue={optCursos[0]} isSearchable styles={colourStyles}></Select>
            </div>
        </div>
    )
}

export default Selects