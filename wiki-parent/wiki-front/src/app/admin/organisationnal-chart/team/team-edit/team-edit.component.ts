import { Component, OnInit } from '@angular/core';
import { Team } from '../../../../models/team';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TeamService } from '../../../../services/team.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.scss']
})
export class TeamEditComponent implements OnInit {

  team: Team;
  error: Error;
  teamForm: FormGroup;

  constructor(private fb: FormBuilder, private teamService: TeamService, private router: Router, private route: ActivatedRoute ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if ( id != null ) {
      this.teamService.getTeam(Number(id)).subscribe(
        (team: Team) => {
          if ( team != null ) {
            this.team = team;
          } else {
            this.router.navigateByUrl('/admin/organisationnal-chart/team');
          }
        }
      );
    } else {
      this.team = new Team(null, '');
    }

    this.createFormControls();
  }

  createFormControls() {
    const name = new FormControl('', [Validators.required]);

    this.teamForm = this.fb.group({
      name: name
    });
  }

  get name() {
    return this.teamForm.get('name');
  }

  save() {
    this.error = null;
    if ( this.teamForm.valid ) {
      this.teamService.saveTeam(this.team).subscribe(
        () => {
          this.router.navigateByUrl('/admin/organisationnal-chart/team');
        },
        (response: HttpErrorResponse) => {
          this.error = response.error;
        }
      );
    }
  }

}
