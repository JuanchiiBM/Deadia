"use client"

import React from 'react'
import { Button } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { DateRangePicker } from "@nextui-org/react";
import { I18nProvider } from "@react-aria/i18n";
import { getLocalTimeZone, today } from "@internationalized/date";
import { useInitDatePicker } from '@/hooks/useInitDatePicker'
import { useContextRegister } from '@/hooks/useContextRegister'
import { useResetModal } from '@/hooks/useResetModal'
import { MODULES, ACTIONS } from '@/helpers/enums'
import { useHandlerPermissions } from '@/hooks/useHandlerPermissions'


interface IOptions {
    onOpen: () => void
    dateRef: any
    selectDateRange: () => Promise<void>
}

const Options: React.FC<IOptions> = ({ onOpen, selectDateRange, dateRef }) => {
    const { setRefreshData, setContentModal, setUpdate, jsonIsLoading } = useContextRegister()
    const {handlerDateInitial, dateInitial} = useInitDatePicker({selectDateRange, onOpen, setContentModal, setRefreshData})
    const {resetModal} = useResetModal({ setContentModal, setUpdate, onOpen})
    const {hasPermission} = useHandlerPermissions()

    return (
        <div className='w-full my-[50px] bg-background-200 h-[80px] flex justify-between p-5 rounded-lg shadow-md'>
            <h2 className='content-center text-xl'>Registrar Inventario</h2>
            <I18nProvider locale='es-ES'>
                <DateRangePicker ref={dateRef} isDisabled={jsonIsLoading} visibleMonths={2} defaultValue={undefined} onChange={(e) => handlerDateInitial(e)} value={dateInitial} id='datepicker' labelPlacement='outside' maxValue={today(getLocalTimeZone())} className="max-w-xs transition-all" classNames={{
                    input: 'bg-background hover:bg-background focus:bg-background',
                    inputWrapper: 'bg-background hover:!bg-background focus:bg-background rounded-md',
                }} calendarProps={{ classNames: { headerWrapper: "bg-background-200", gridHeader: "bg-background-200" } }} />
            </I18nProvider>
            {hasPermission(MODULES.MODULEINVENTORY, ACTIONS.CREATE) &&
            <Button onPress={resetModal} isDisabled={jsonIsLoading} className='content-center h-full text-conntent2 text-md' color='primary' startContent={<FontAwesomeIcon icon={faUserPlus} className='text-content2  text-xl'/>}>
                Crear Registro
            </Button>
            }
        </div>
    )
}

export default Options