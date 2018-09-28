import { Environment } from './environment';
import { Server } from './server';



export class Layer {

    environ: Environment = new Environment(null, null);
    servers: Server [] = [];





    public constructor(
       public id: number,
       public  name: string,
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
