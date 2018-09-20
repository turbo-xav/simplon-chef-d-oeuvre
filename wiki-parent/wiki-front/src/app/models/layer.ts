import { Environment } from './environment';
import { Server } from './server';

export class Layer {
    id: number = null;
    name: string;
    environment: Environment = new Environment(null, null);
    servers: Server [] = [];



    public constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
}


public setEnv(environ: Environment): void {
    this.environment  = environ;
}

public getEnv(): Environment {
    return this.environment;
}
}

