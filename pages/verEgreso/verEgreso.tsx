"use client"

import React, { useState } from 'react'
import { Option } from '@/utils/globals'
import OptionsVerEgreso from './options'

const VerEgreso = () => {
  const [valueCategory, setValueCategory] = useState<Option | null>()
  const [valueArticle, setValueArticle] = useState<Option | null>()

  return (
    <>
        <h1 className='text-4xl'>Egresos</h1>
        <OptionsVerEgreso setValueArticle={setValueArticle} setValueCategory={setValueCategory} valueArticle={valueArticle} valueCategory={valueCategory} />
    </>
  )
}

export default VerEgreso

// Selects por Categoría y por Articulo