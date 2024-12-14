import { IPermissionsContent } from "@/helpers/interfaces";
import { MODULES, ACTIONS } from "@/helpers/enums";

export const useHandlerPermissions = () => {
    const permissions = JSON.parse(localStorage.getItem("permission") || '')

    const inscripcion: {items: string[], paths: string[]} = {
        items: [],
        paths: []
    }

    const egreso: {items: string[], paths: string[]} = {
        items: [],
        paths: []
    }

    const inventario: {items: string[], paths: string[]} = {
        items: [],
        paths: []
    }

    const sistema: {items: string[], paths: string[]} = {
        items: [],
        paths: []
    }

    // Agregar "VerInscripciones" solo si hay VIEW para Inscripción
    if (permissions.some((permission: IPermissionsContent) => permission.module === MODULES.MODULEINSCRIPTION && permission.action === ACTIONS.READ)) {
        inscripcion.items.push("Visualizar Inscripciones");
        inscripcion.paths.push("/inscripciones/verInscripcion");
    }

    // Agregar "RegistrarInscripciones" solo si hay REGISTER para Inscripción
    if (permissions.some((permission: IPermissionsContent) => permission.module === MODULES.MODULEINSCRIPTION && permission.action === ACTIONS.REGISTER)) {
        inscripcion.items.push("Registrar Inscripciones");
        inscripcion.paths.push("/inscripciones/registrarInscripcion");
    }

    // Agregar "VerEgresos" solo si hay VIEW para Egresos
    if (permissions.some((permission: IPermissionsContent) => permission.module === MODULES.MODULEEGRESS && permission.action === ACTIONS.READ)) {
        egreso.items.push("Visualizar Egresos");
        egreso.paths.push("/egresos/verEgreso");
    }

    // Agregar "RegistrarEgresos" solo si hay REGISTER para Egresos
    if (permissions.some((permission: IPermissionsContent) => permission.module === MODULES.MODULEEGRESS && permission.action === ACTIONS.REGISTER)) {
        egreso.items.push("Registrar Egresos");
        egreso.paths.push("/egresos/registrarEgreso");
    }

    // Agregar "VerInventario" solo si hay VIEW para Inventario
    if (permissions.some((permission: IPermissionsContent) => permission.module === MODULES.MODULEINVENTORY && permission.action === ACTIONS.READ)) {
        inventario.items.push("Visualizar Inventario");
        inventario.paths.push("/inventario/verInventario");
    }

    // Agregar "RegistrarInventario" solo si hay REGISTER para Inventario
    if (permissions.some((permission: IPermissionsContent) => permission.module === MODULES.MODULEINVENTORY && permission.action === ACTIONS.REGISTER)) {
        inventario.items.push("Registrar Inventario");
        inventario.paths.push("/inventario/registrarInventario");
    }

    // Agregar "Usuarios" solo si hay VIEW para Usuarios
    if (permissions.some((permission: IPermissionsContent) => permission.module === MODULES.MODULEUSER && permission.action === ACTIONS.READ)) {
        sistema.items.push("Usuarios");
        sistema.paths.push("/sistema/usuarios");
    }

    // Agregar "Perfiles" solo si hay VIEW para Perfiles
    if (permissions.some((permission: IPermissionsContent) => permission.module === 'perfil' && permission.action === ACTIONS.READ)) {
        sistema.items.push("Perfiles");
        sistema.paths.push("/sistema/perfiles");
    }

    // Agregar "Acciones" solo si hay VIEW para Acciones
    if (permissions.some((permission: IPermissionsContent) => permission.module === 'acciones' && permission.action === ACTIONS.READ)) {
        sistema.items.push("Acciones");
        sistema.paths.push("/sistema/acciones");
    }

    return {permissions, sistema, inscripcion, egreso, inventario}
}