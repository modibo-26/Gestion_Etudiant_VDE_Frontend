import { Filiere } from "./filiere"

export interface User {
    id: number
    code?: string
    email?: string
    nom: string
    prenom: string
    dateEntree?: Date
    role?: string
    filiereId:number
    superFiliereId?:number
    progression?: number
}
