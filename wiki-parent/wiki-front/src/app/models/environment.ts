import { Layer } from './layer';

export class Environment {
    id: number = null;
    name: string;
    layers: Layer [] = [];


    public constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
}
}
