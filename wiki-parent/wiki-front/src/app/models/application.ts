export class Application {
    id: number = null;
    codeApp: string;
    title: string;
    description: string;

    public constructor(id: number, codeApp: string, title: string, description: string) {
        this.id = id;
        this.codeApp = codeApp;
        this.title = title;
        this.description = description;

    }

}
