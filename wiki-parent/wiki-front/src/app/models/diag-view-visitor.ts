import { Application } from './application';
import { Server } from './server';

export class DiagViewVisitor {
    id: number = null;
    url: string;
    application: Application = new Application(null, null, null, null);
    server: Server = new Server(null, null);


    public constructor(
        id: number,
        url: string
    ) {
        this.id = id;
        this.url = url;
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
