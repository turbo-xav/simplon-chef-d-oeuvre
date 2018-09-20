import { Layer } from './layer';
import { Diagnostic } from './diagnostic';
export class Server {
    id: number = null;
    name: string;
    layer: Layer = new Layer(null, null);
    diagnostics: Diagnostic [] = [];


    public constructor(
        id: number,
        name: string
    ) {
        this.id = id;
        this.name = name;
    }

    public setLayer(layer: Layer): void {
        this.layer  = layer;
    }

    public getLayer(): Layer {
        return this.layer;
    }


}
