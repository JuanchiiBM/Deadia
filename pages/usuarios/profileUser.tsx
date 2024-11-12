import React from 'react'
import { IProfileUser } from '@/helpers/interfaces'

const ProfileUser: React.FC<IProfileUser> = ({ perfil, cant_users}) => {
  return (
    <div className='flex'>
      <p>{perfil}</p>
      <p>{cant_users}</p>
    </div>
  )
}

export default ProfileUser
