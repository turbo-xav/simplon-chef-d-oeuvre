import { Layer } from './layer';

export class Environment {
    layers: Layer [] = [];


    public constructor(public id: number, public name: string) {

      }
}
