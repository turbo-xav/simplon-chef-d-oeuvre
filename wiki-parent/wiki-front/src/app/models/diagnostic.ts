export class Diagnostic {

    id: number = null;
    url: string;

    public constructor(id: number, name: string) {
        this.id = id;
        this.url = name;
}
}
