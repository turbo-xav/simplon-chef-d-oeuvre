import { User } from './user';

export class Role {
    id: number = null;
    name: String;
    users: User[] = [];


    public constructor(id: number, name: String) {
        this.id = id;
        this.name = name;
    }

    public addUser(user: User) {
        this.users.push(user);
    }
    public getUsers(): User[] {
        return this.users;
    }
}
