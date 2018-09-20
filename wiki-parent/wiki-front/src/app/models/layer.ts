import { Environment } from './environment';
import { Server } from './server';



export class Layer {
    id: number = null;
    name: string;
    environ: Environment = new Environment(null, null);
    servers: Server [] = [];





    public constructor(
        id: number,
         name: string,
    ) {
        this.id = id;
        this.name = name;

    }

        public setEnv(environment: Environment): void {
            this.environ  = environment;
        }

        public getEnv(): Environment {
            return this.environ;
        }

}
