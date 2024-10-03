import React from 'react'
import { Spinner } from '@nextui-org/react'

const SpinnerC = () => {
  return (
    <div className='bg-gray-600/[0.5] fixed top-0 left-0 w-full h-full flex justify-center align-center z-50'>
        <Spinner label='Cargando...' color='white'/>
    </div>
  )
}

export default SpinnerC