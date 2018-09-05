import { Team } from './team';
import { Fonction } from './fonction';


export class Member {
    id: number = null;
    name: string;
    fonction: Fonction;
    team: Team;


    public constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    public setFunction(myFunction: Fonction) {
        this.fonction = myFunction;
    }
    public getFunction(): Fonction {
        return this.fonction;
    }

    public setTeam(team: Team) {
        this.team = team;
    }
    public getTeam(): Team {
        return this.team;
    }
}
