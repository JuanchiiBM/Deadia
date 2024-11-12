import React from 'react'
import ProfileUser from './profileUser'
import { useJsonData } from '@/hooks/useJsonData'

const StatsUsers = () => {
    const { isLoading, jsonData } = useJsonData({ url: '' })

    return (
        <>
            <h2>Contador</h2>
            {jsonData && jsonData.map((data: any) => {
                <ProfileUser perfil={data.perfil} cant_users={data.cant_users} />
            })}
        </>
    )
}

export default StatsUsers
