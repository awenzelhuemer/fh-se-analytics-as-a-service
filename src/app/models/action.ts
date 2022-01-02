import { ActionType } from "./action-type";

export interface Action {
    id: string,
    type: ActionType,
    endpoint: string
}