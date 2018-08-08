import { User } from './user';

export class Role {
    id: number;
    name: String;
    users: User[] = [];


    public constructor(name: String) {
        this.name = name;
    }
}
