import { ActionType } from "./action-type";

export interface Action {
    id: number,
    type: ActionType,
    endpoint: string
}