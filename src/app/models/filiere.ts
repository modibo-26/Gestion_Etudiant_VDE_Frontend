import { Module } from "./module"
import { SuperFiliere } from "./super-filiere"
import { User } from "./user"

export interface Filiere {
    id: number
    nom: string
    description: string
    users?: User[]
    modules?: Module[]
    superFiliere?: SuperFiliere
    nbEtudiants: number
}
