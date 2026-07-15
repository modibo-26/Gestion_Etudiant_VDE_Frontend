import { Filiere } from "./filiere"
import { User } from "./user"

export interface SuperFiliere {
    id: number
    nom: string
    description: string
    //users?: User[]
    //filieres?: Filiere[]
    //nbEtudiants: number
    nbFilieres: number
}
