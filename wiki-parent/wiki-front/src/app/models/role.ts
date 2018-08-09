import { User } from './user';

export class Role {
    id: number = null;
    name: String;
    users: User[] = [];


    public constructor(id: number, name: String) {
        this.id = id;
        this.name = name;
    }
}
