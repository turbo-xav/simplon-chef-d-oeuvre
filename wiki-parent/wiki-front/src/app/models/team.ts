export class Team {
    id: number = null;
    name: string;

    team: Team = null;
    teams: Team[] = [];

    public constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        console.log(this);
    }
}
