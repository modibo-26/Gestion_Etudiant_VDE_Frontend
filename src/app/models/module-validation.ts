import { Module } from "./module";
import { User } from "./user";

export interface ModuleValidation {
    id: number;
    statut: string;
    validationDate: Date;
    note: number;
    module: Module;
    user: User
}