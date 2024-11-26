"use client"

import React from 'react'
import { Button } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { DateRangePicker } from "@nextui-org/react";
import { I18nProvider } from "@react-aria/i18n";
import { getLocalTimeZone, parseDate, today, DateValue, startOfYear } from "@internationalized/date";
import { useInitDatePicker } from '@/hooks/useInitDatePicker'
import { useEgressRegisterContext } from '@/hooks/egresos/registrarEgreso/useContext'


interface IOptionRegistrarEgreso {
    onOpen: () => void
    setContentModal: React.Dispatch<React.SetStateAction<undefined>>
    dateRef: any
    selectDateRange: () => Promise<void>
}

const OptionsRegistrarEgreso: React.FC<IOptionRegistrarEgreso> = ({ onOpen, selectDateRange, setContentModal, dateRef }) => {
    const { setRefreshData } = useEgressRegisterContext()
    const {handlerDateInitial, dateInitial, resetModal} = useInitDatePicker({selectDateRange, onOpen, setContentModal, setRefreshData})
    
    return (
        <div className='w-full my-[50px] bg-background-200 h-[80px] flex justify-between p-5 rounded-lg shadow-md'>
            <h2 className='content-center text-xl'>Registrar Egresos</h2>
            <I18nProvider locale='es-ES'>
                <DateRangePicker ref={dateRef} visibleMonths={2} defaultValue={undefined} onChange={(e) => handlerDateInitial(e)} value={dateInitial} id='datepicker' labelPlacement='outside' maxValue={today(getLocalTimeZone())} className="max-w-xs transition-all" classNames={{
                    input: 'bg-background hover:bg-background focus:bg-background',
                    inputWrapper: 'bg-background hover:!bg-background focus:bg-background rounded-md',
                }} calendarProps={{ classNames: { headerWrapper: "bg-background-200", gridHeader: "bg-background-200" } }} />
            </I18nProvider>
            <Button onClick={onOpen} className='content-center h-full text-conntent2 text-md' color='primary' startContent={
                <FontAwesomeIcon icon={faUserPlus} className='text-content2  text-xl'/>
            }>Crear Registro</Button>
        </div>
    )
}

export default OptionsRegistrarEgreso