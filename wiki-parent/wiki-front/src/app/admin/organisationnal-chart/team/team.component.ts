import { Component, OnInit } from '@angular/core';
import { Team } from '../../../models/team';
import { TeamService } from '../../../services/team.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DataTableUtils } from '../../../utils/dataTableUtils';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  teams: Team[] = [];
  error: Error;
  constructor(private teamService: TeamService, private dataTableUtils: DataTableUtils ) {

  }

  ngOnInit() {
    this.loadTeams();
  }

  delete(id: number) {
      this.teamService.deleteTeam(id).subscribe(
          () => {
            this.loadTeams();
        }
      );
  }

  private gererateDataTable(): void {
    if ( typeof this.dataTableUtils.getTable() ===  'undefined') {
      this.dataTableUtils.generate();
    }
  }

  loadTeams() {
    this.teamService.getTeams().subscribe(
      (teams: Team[]) => {
        this.teams = teams;
        this.gererateDataTable();
      },
      (response: HttpErrorResponse) => {
        this.error = response.error;
      }
    );
  }

}
