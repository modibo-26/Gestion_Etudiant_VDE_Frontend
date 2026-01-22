import { Module } from "./module"
import { User } from "./user"

export interface Filiere {
    id: number
    nom: string
    description: string
    users?: User[]
    modules?: Module[]
    nbEtudiants: number
}
