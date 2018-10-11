import { Role } from './role';

/*
 * User Class definition
 *
 * @author <xavier.tagliarino@gmail.com>
 *
 */

export class User {
    id: number = null;
    uid: string;
    mail: string;
    firstName: string;
    lastName: string;
    password: string;
    locked: boolean;
    enabled: boolean;
    role: Role = new Role(null, null);

   /**
    * Initialize an instance of User
    *
    * @param  {number} id
    * @param  {string} uid
    * @param  {string} firstName
    * @param  {string} lastName
    * @param  {string} mail
    * @param  {string} password
    * @param  {boolean} locked
    * @param  {boolean} enabled
    */
   public constructor(
        id: number, uid: string, firstName: string, lastName: string, mail: string, password: string, locked: boolean, enabled: boolean
    ) {
        this.id = id;
        this.uid = uid;
        this.firstName = firstName;
        this.lastName = lastName;
        this.mail = mail;
        this.password = password;
        this.locked = locked;
        this.enabled = enabled;
    }

    /**
      * Define a Role for an User
      *
      * @param  {Role} role
      * @returns void
      */

    public setRole(role: Role): void {
        this.role = role;
    }
    
    /**
     * Get Role of an User
     * 
     * @returns Role
     */
    public getRole(): Role {
        return this.role;
    }
}
