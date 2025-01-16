import React from 'react'
import { IProfileUser } from '@/helpers/interfaces'

const ProfileUser: React.FC<IProfileUser> = ({ perfil, cant_users }) => {
    return (
        <>
            <p>♦ {perfil}: {cant_users}</p>
        </>
    )
}

export default ProfileUser
