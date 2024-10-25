import React, { useEffect, useRef, useState } from 'react'
import Select, { SelectInstance } from 'react-select';
import { DateRangePicker, DateRangePickerReturnType } from "@nextui-org/react";
import {RangeValue} from "@react-types/shared";
import { colourStyles } from '@/helpers/selects';
import { I18nProvider } from "@react-aria/i18n";
import {getLocalTimeZone, parseDate, today, DateValue, startOfYear} from "@internationalized/date";

interface ISelects {
    changeJson: (value: string, ret?: boolean) => void
    changeJsonForCurse: (value: string) => void
    changeRange: () => void
    dateRef: any
}

const Selects: React.FC<ISelects> = ({ changeJson, changeJsonForCurse, changeRange, dateRef }) => {
    const cursoSelect = useRef<SelectInstance<any> | null>(null);
    const depSelect = useRef<SelectInstance<any> | null>(null);
    const [dateInitial, setDateInitial] = useState<RangeValue<any>>({
        start: startOfYear(today(getLocalTimeZone())),
        end: today(getLocalTimeZone()),
      });
    const [isDisabled, setIsDisabled] = useState(true)
    const [optCursos, setOptCursos] = useState([])
    let optionsCursos

    const disabledCursos = (val: string, data: any) => {
        if (cursoSelect.current && val != '0') {
            setIsDisabled(false)
            setDateInitial({
                start: startOfYear(today(getLocalTimeZone())),
                end: today(getLocalTimeZone()),
              });
            optionsCursos = data.map((opt: any, index: number) => {
                return {
                    value: index + 1,
                    type: 'curso',
                    label: `${opt.curso} | ${opt.aula}`
                };
            });
            cursoSelect.current.setValue('0', 'select-option')
            setOptCursos(optionsCursos)
        }
        else if (cursoSelect.current) {
            cursoSelect.current.setValue('0', 'select-option')
            setIsDisabled(true)
        }
    }

    const changeDependency = async (e: any) => {
        if (e.value != undefined) {
            const data = await changeJson(e.value, true)
            disabledCursos(e.value, data)
        }
    }


    const changeCurse = async (e: any) => {
        if (e.value != undefined) {
            const data = await changeJsonForCurse(e.value)
        }
    }

    useEffect(() => {
        dateInitial && dateInitial.start != undefined && changeRange()
    }, [dateInitial])

    const optionsDependencias = [
        { value: '0', label: 'Todas' },
        { value: '1', label: 'Informatica' },
        { value: '2', label: 'Idiomas' },
    ]
    return (
        <div className='w-full my-[50px] h-[110px] bg-background-200 flex justify-around p-5 rounded-lg shadow-md'>
            <div className='flex flex-col'>
                <label htmlFor="select-dependency">Dependencia:</label>
                <Select className='w-[170px]' placeholder='Dependencias' ref={depSelect} noOptionsMessage={({ inputValue }) => !inputValue ? 'No existe esa opción' : 'No existe esa opción'} onChange={changeDependency} options={optionsDependencias} defaultValue={optionsDependencias[0]} isSearchable styles={colourStyles}></Select>
            </div>
            <div>
                <I18nProvider locale='es-ES'>
                    <label htmlFor="datepicker">Seleccionar Rango:</label>
                    <DateRangePicker visibleMonths={2} ref={dateRef} defaultValue={undefined} onChange={setDateInitial} value={dateInitial} id='datepicker' labelPlacement='outside' maxValue={today(getLocalTimeZone())} className="max-w-xs transition-all" classNames={{
                        input: 'bg-background hover:bg-background focus:bg-background',
                        inputWrapper: 'bg-background hover:!bg-background focus:bg-background rounded-md',
                    }} calendarProps={{classNames: { headerWrapper: "bg-background-200", gridHeader: "bg-background-200"}}} />
                </I18nProvider>
            </div>
            <div className='flex flex-col'>
                <label htmlFor="select-curso">Curso:</label>
                <Select className='w-[170px]' isDisabled={isDisabled} ref={cursoSelect} placeholder='Cursos' noOptionsMessage={({ inputValue }) => !inputValue ? 'No existe esa opción' : 'No existe esa opción'} onChange={changeCurse} options={optCursos} defaultValue={optCursos[0]} isSearchable styles={colourStyles}></Select>
            </div>
        </div>
    )
}

export default Selects