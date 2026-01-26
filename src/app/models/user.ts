import { Filiere } from "./filiere"

export interface User {
    id: number
    code?: string
    email?: string
    password?: string
    nom: string
    prenom: string
    dateEntree?: Date
    role?: string
    filiere?:Filiere
    progression?: number
}
