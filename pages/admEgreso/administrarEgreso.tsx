"use client"

import React, { useState } from 'react'
import dynamic from "next/dynamic";
import OptionsAdministrarEgreso from './options'
import DataTableEgresos from './tableEgresos';
import ModalEgresos from './modal';
import { ChartEgresos } from './chartEgresos';
import { useDisclosure } from '@nextui-org/react';

const Chart = dynamic(
  () => import("@/pages/admEgreso/chartEgresos").then((mod) => mod.ChartEgresos
  ),
  {
    ssr: false,
  }
);

const AdministrarEgreso = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState()

  return (
    <>
      <h1 className='text-4xl'>Egresos</h1>
      <ChartEgresos data={data} setData={setData}/>
      <OptionsAdministrarEgreso onOpen={onOpen} />
      <DataTableEgresos data={data} setData={setData}/>
      <ModalEgresos isOpen={isOpen} onClose={onClose} onOpen={onOpen}/>
    </>
  )
}

export default AdministrarEgreso