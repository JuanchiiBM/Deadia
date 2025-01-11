import { MODULES, ACTIONS } from "../enums/permissions"

export type TMODULES = typeof MODULES[keyof typeof MODULES];

export type TACTIONS = typeof ACTIONS[keyof typeof ACTIONS];

export interface TPermissionsContent {
    module: TMODULES,
    action: TACTIONS
}