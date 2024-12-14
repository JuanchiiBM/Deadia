import { IPermissionsContent } from "@/helpers/interfaces"

export const useHandlerPermissions = () => {
    const permissions = JSON.parse(localStorage.getItem("permission") || '')
    console.log(permissions)

    const hasPermission = (module: string, action: string) => {
        return permissions.some((permission: IPermissionsContent) => permission.module === module && permission.action === action)
    }

    return { hasPermission }
}