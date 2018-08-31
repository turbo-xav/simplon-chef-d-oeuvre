import { User } from './user';

export class Guideline {
    id: number = null;
    name: string;
    user: User;
    file: string;
    type: string;
    description: string;


    public constructor(id: number, name: string, file: string, type: string, description: string) {
        this.id = id;
        this.name = name;
        this.file = file;
        this.type = type;
        this.description = description;
    }

    public setUser(user: User) {
        this.user = user;
    }
    public getUser(): User {
        return this.user;
    }
}
