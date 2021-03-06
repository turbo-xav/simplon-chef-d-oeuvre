import { Member } from './member';

export class Fonction {
    id: number ;
    name: string;
    description: string;
    members: Member[] = [];


    public constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    public addMember(user: Member) {
        this.members.push(user);
    }
    public getMembers(): Member[] {
        return this.members;
    }
}
