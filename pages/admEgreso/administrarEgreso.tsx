"use client"

import React from 'react'
import dynamic from "next/dynamic";
import OptionsAdministrarEgreso from './options'
import DataTableEgresos from './tableEgresos';
import ModalEgresos from './modal';
import { useDisclosure } from '@nextui-org/react';

/*
const Chart = dynamic(
  () => import("@/pages/verIngreso/chart").then((mod) => mod.ChartIngresos
  ),
  {
    ssr: false,
  }
);
*/

const AdministrarEgreso = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <h1 className='text-4xl'>Egresos</h1>
      <OptionsAdministrarEgreso onOpen={onOpen} />
      <DataTableEgresos />
      <ModalEgresos isOpen={isOpen} onClose={onClose} onOpen={onOpen}/>
    </>
  )
}

export default AdministrarEgreso