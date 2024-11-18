"use client"

import React, { useState, useRef } from 'react'
import OptionsRegistrarIngreso from './options'
import DataTableRegistrarIngreso from './dataTable'
import ModalRegistrarIngreso from './modal'
import { useDisclosure } from '@nextui-org/react'

const RegistrarIngreso = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [contentModal, setContentModal] = useState()
    const [dateSelected, setDateSelected] = useState<any[]>()
    const [optionsCharged, setOptionsCharged] = useState<boolean>(false)
    const dateRef = useRef<any>()
    const [tableLoader, setTableLoader] = useState(true);

    const selectDateRange = async () => {
        await setDateSelected(dateRef.current.innerText.split('\n').join('').split('-').map((date: any) => {
            const partsOfDate = date.split('/').reverse()
            partsOfDate[1].length == 1 ? partsOfDate[1] = `0${partsOfDate[1]}` : null
            partsOfDate[2].length == 1 ? partsOfDate[2] = `0${partsOfDate[2]}` : null
            return `${partsOfDate[0]}-${partsOfDate[1]}-${partsOfDate[2]}`
        }))
    }

    return (
        <>
            <h1 className='text-4xl'>Inscripciones</h1>
            <OptionsRegistrarIngreso optionsCharged={optionsCharged} onOpen={onOpen} setContentModal={setContentModal} dateRef={dateRef} selectDateRange={selectDateRange} />
            <DataTableRegistrarIngreso setTableLoader={setTableLoader} tableLoader={tableLoader} isOpen={isOpen} onClose={onClose} onOpen={onOpen} setContentModal={setContentModal} dateSelected={dateSelected} />
            <ModalRegistrarIngreso setContentModal={setContentModal} setOptionsCharged={setOptionsCharged} isOpen={isOpen} onClose={onClose} onOpen={onOpen} contentModal={contentModal} />
        </>
    )
}

export default RegistrarIngreso