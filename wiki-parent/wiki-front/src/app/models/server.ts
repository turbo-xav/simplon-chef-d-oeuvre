export class Server {
    id: number = null;
    name: string;
    url: string;

    public constructor(id: number, name: string, url: string) {
        this.id = id;
        this.name = name;
        this.url = url;

    }
}
