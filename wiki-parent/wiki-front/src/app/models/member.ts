import { Team } from './team';
import { Fonction } from './fonction';


export class Member {
    id: number;
    firstName: string;
    lastName: string;
    mail: string;
    function: Fonction = null;
    team: Team = null;


    public constructor(id: number) {
        this.id = id;
    }

    public setFunction(myFunction: Fonction) {
        this.function = myFunction;
    }
    public getFunction(): Fonction {
        return this.function;
    }

    public setTeam(team: Team) {
        this.team = team;
    }
    public getTeam(): Team {
        return this.team;
    }
}
