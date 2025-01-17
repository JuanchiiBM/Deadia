import { TMODULES, TPermissionsContent } from "@/utils/types/permissions"

const useHandlerPermissions = () => {
    const permissions = JSON.parse(localStorage.getItem("permission") || '')

    const hasPermission = (module: TMODULES, action: string) => {
        return permissions.some((permission: TPermissionsContent) => permission.module === module && permission.action === action)
    }

    return { hasPermission }
}

export default useHandlerPermissions