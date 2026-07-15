
export interface Filiere {
    id: number;
    nom: string;
    description: string;
    usersIds: number[];
    modulesIds?: number[];
    superFiliereId?: number;
    nbEtudiants: number;
}
