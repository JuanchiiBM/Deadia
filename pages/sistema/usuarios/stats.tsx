import React from 'react'
import ProfileUser from './profileUser'

import { useGenerateStats } from '@/hooks/sistema/usuarios/useGenerateStats'

const StatsUsers = () => {
    const { stats } = useGenerateStats()

    return (
        <>
            <h2 className='mb-4'>Contador de Usuarios</h2>
            <div className='flex items-start flex-col gap-[10px] text-sm'>
                {stats && stats.map((data: any) => (
                    <ProfileUser key={data.perfil} perfil={data.perfil} cant_users={data.count} />
                ))}
            </div>
        </>
    )
}

export default StatsUsers