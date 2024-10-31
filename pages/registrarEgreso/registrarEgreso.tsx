"use client"

import React, { useState } from 'react'
import dynamic from "next/dynamic";
import OptionsRegistrarEgreso from './options'
import DataTableEgresos from './tableEgresos';
import ModalEgresos from './modal';
import { useDisclosure } from '@nextui-org/react';


const RegistrarEgreso = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState()

  return (
    <>
      <h1 className='text-4xl'>Egresos</h1>
      <OptionsRegistrarEgreso onOpen={onOpen} />
      <DataTableEgresos data={data} setData={setData}/>
      <ModalEgresos isOpen={isOpen} onClose={onClose} onOpen={onOpen}/>
    </>
  )
}

export default RegistrarEgreso