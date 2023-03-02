import { Pokemon } from "./pokemon.model";

/* create a model for trainer data*/

export interface Trainer{
    id: number;
    username: string;
    pokemon: Pokemon[];
}