import React from 'react'
import { Spinner } from '@nextui-org/react'

const SpinnerC = () => {
  return (
    <div className='bg-gray-600/[0.5] fixed top-0 left-0 w-full h-full flex justify-center align-center z-[60]'>
      <div className='flex flex-col justify-center items-center'>
        <Spinner color='white' />
        <span className='text-white'>Cargando...</span>
      </div>
    </div>
  )
}

export default SpinnerC