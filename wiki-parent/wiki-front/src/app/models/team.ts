import { Member } from './member';

export class Team {
    id: number = null;
    name: string;

    team: Team = null;
    teams: Team[] = [];
    members: Member[] = [];

    public constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}
