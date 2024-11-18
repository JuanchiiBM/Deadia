import { useEffect, useState } from "react"
import { IUsersTable } from "@/helpers/interfaces"

export const useDataTableUsers = ({ jsonData }: { jsonData: IUsersTable | any}) => {
    const [tableData, setTableData] = useState<any[] | undefined>(undefined)
    const columnsData = [
        { data: '', title: '' },
    ]

    useEffect(() => {
        const tableDataMapped = jsonData.sarasa.map(() => ({

        }))

        setTableData(tableDataMapped)
    }, [])

    return {tableData, columnsData}
}