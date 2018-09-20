import { Layer } from './layer';
export class Server {
    id: number = null;
    name: string;
    layer: Layer = new Layer (null, null);

    public constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    public setLay(layer: Layer): void {
        this.layer  = layer;
    }

    public getLay(): Layer {
        return this.layer;
    }
}
