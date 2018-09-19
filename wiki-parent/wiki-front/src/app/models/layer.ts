import { Environment } from './environment';
export class Layer {
    id: number = null;
    name: string;
    environment: Environment = new Environment(null, null);



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

