import { IUsersTableInside } from "@/utils/interfaces/usuarios";
import { useContextRegister } from "@/context/contextRegister";
import { useState, useEffect } from "react";

export const useGenerateStats = () => {
    const { jsonData, jsonIsLoading } = useContextRegister();
    const [stats, setStats] = useState<{ perfil: string, count: number }[]>([]);

    useEffect(() => {
        if (!jsonIsLoading && jsonData) {
            const tempStats: { [key: string]: number } = {};

            tempStats['Total'] = jsonData.list.length;

            jsonData.list.forEach((data: IUsersTableInside) => {
                if (tempStats[data.perfil]) {
                    tempStats[data.perfil] += 1;
                } else {
                    tempStats[data.perfil] = 1;
                }
            });

            const statsArray = Object.keys(tempStats).map((key) => ({
                perfil: key,
                count: tempStats[key]
            }));

            setStats(statsArray);
        }
    }, [jsonIsLoading, jsonData]);

    return { stats };
};