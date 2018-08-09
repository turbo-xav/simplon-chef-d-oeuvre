import { Role } from './role';

export class User {
    id: number = null ;
    uid: string;
    mail: string;
    firstName: string;
    lastName: string;
    password: string;
    role: Role = new Role(null, null);

    public constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
