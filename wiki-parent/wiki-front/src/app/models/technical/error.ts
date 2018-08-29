export class Error {

    public msg: String;

    public errors: string[];

    public constructor(msg: string) {
        this.msg = msg;
        this.errors = [];
    }
}
