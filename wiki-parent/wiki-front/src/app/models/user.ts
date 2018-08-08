import { Role } from './role';

export class User {
    id: number;
    uid: string;
    mail: string;
    fistName: string;
    lastName: string;
    password: string;
    role: Role;

    public constructor(firstName: string, lastName: string) {
        this.fistName = firstName;
        this.lastName = lastName;
    }
}
