import { Layer } from './layer';
import { Server } from './server';
import { Application } from './application';

export class Diagnostic {

    id: number = null;
    url: string;
    application: Application = new Application(null, null, null, null);
    server: Server = new Server(null, null);


    public constructor(id: number, name: string) {
        this.id = id;
        this.url = name;
}
public setApplication(application: Application): void {
    this.application  = application;
}

public getApplication(): Application {
    return this.application;
}

public setServer(server: Server): void {
    this.server  = server;
}

public getServer(): Server {
    return this.server;
}

}
