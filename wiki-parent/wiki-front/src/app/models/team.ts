export class Team {
    id: number = null;
    name: string;

    team: Team;
    teams: Team[];

    public constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}
