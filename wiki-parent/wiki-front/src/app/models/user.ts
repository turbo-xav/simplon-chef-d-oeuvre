import { Role } from './role';

export class User {
    id: number = null ;
    uid: string;
    mail: string;
    firstName: string;
    lastName: string;
    password: string;
    locked: boolean;
    enabled: boolean;
    role: Role = new Role(null, null);

    public constructor(
        id: number  ,
        uid: string ,
        firstName: string,
        lastName: string,
        mail: string,
        password: string,
        locked: boolean,
        enabled: boolean
    ) {
        this.id         = id;
        this.uid        = lastName;
        this.firstName  = firstName;
        this.lastName   = lastName;
        this.mail       = mail;
        this.password   = password;
        this.locked     = locked;
        this.enabled    = enabled;
    }

    public setRole(role: Role): void {
        this.role  = role;
    }

    public getRole(): Role {
        return this.role;
    }
}
