import { IPermissionsContent } from "@/helpers/interfaces";
import { MODULES } from "@/helpers/enums";

export const useHandlerPermissions = () => {
    const permissions = JSON.parse(localStorage.getItem("permission") || '')

    const sistemaItems: string[] = [];
    const sistemaPaths: string[] = [];

    // Agregar "Usuarios" solo si hay VIEW para Usuarios
    if (permissions.some((permission: IPermissionsContent) => permission.module === MODULES.MODULEUSER && permission.action === 'VIEW')) {
        sistemaItems.push("Usuarios");
        sistemaPaths.push("/sistema/usuarios");
    }

    // Agregar "Perfiles" solo si hay VIEW para Perfiles
    if (permissions.some((permission: IPermissionsContent) => permission.module === 'perfil' && permission.action === 'VIEW')) {
        sistemaItems.push("Perfiles");
        sistemaPaths.push("/sistema/perfiles");
    }

    // Agregar "Acciones" solo si hay VIEW para Acciones
    if (permissions.some((permission: IPermissionsContent) => permission.module === 'acciones' && permission.action === 'VIEW')) {
        sistemaItems.push("Acciones");
        sistemaPaths.push("/sistema/acciones");
    }

    return {permissions, sistemaItems, sistemaPaths}
}