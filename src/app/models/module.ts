import { Filiere } from "./filiere"

export interface Module {
    id: number
    nom: string
    description: string
    filieres: Filiere[]
}
