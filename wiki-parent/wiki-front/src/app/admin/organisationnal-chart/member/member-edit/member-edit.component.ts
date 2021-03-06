import { Component, OnInit } from '@angular/core';
import { Member } from '../../../../models/member';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from '../../../../services/member.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TeamService } from '../../../../services/team.service';
import { Team } from '../../../../models/team';
import { Fonction } from '../../../../models/fonction';
import { FonctionService } from '../../../../services/fonction.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {

  teams: Team[];
  fonctions: Fonction[];
  member: Member;
  error: Error;
  memberForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private teamService: TeamService,
    private fonctionService: FonctionService,
    private memberService: MemberService,
    private router: Router,
    private route: ActivatedRoute ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if ( id != null ) {
      this.memberService.getMember(Number(id)).subscribe(
        (member: Member) => {
          if ( member != null ) {
            this.member = member;
          } else {
            this.router.navigateByUrl('/admin/member');
          }
        }
      );
    } else {
      this.member = new Member(null);
    }

    this.createFormControls();
    this.loadTeams();
    this.loadFonctions();
    console.log('member : ', this.member);
  }

  loadFonctions() {
    this.fonctionService.getFonctions().subscribe(
      (fonctions: Fonction[]) => {
        this.fonctions = fonctions;
      },
      (response: HttpErrorResponse) => {
        this.error = response.error;
      }
    );
  }

  loadTeams() {
    this.teamService.getTeams().subscribe(
      (teams: Team[]) => {
        this.teams = teams;
      },
      (response: HttpErrorResponse) => {
        this.error = response.error;
      }
    );
  }

  createFormControls() {
    const firstName = new FormControl('', [Validators.required]);
    const lastName = new FormControl('', [Validators.required]);
    const mail = new FormControl('', [Validators.required, Validators.email]);
    const team = new FormControl('', [Validators.required]);
    const fonction = new FormControl('', [Validators.required]);
    const tel = new FormControl('', [Validators.required, Validators.pattern('^0[1-9]{1}[0-9]{8}$')]);

    this.memberForm = this.fb.group({
      firstName: firstName,
      lastName: lastName,
      mail: mail,
      team: team,
      fonction: fonction,
      tel: tel
    });
  }

  get firstName() {
    return this.memberForm.get('firstName');
  }

  get lastName() {
    return this.memberForm.get('lastName');
  }

  get mail() {
    return this.memberForm.get('mail');
  }

  get tel() {
    return this.memberForm.get('tel');
  }

  get team() {
    return this.memberForm.get('team');
  }

  get fonction() {
    return this.memberForm.get('fonction');
  }

  save() {
    this.error = null;
    if ( this.memberForm.valid ) {
      this.memberService.saveMember(this.member).subscribe(
        () => {
          this.router.navigateByUrl('/admin/organisationnal-chart/member');
        },
        (response: HttpErrorResponse) => {
          this.error = response.error;
        }
      );
    }
  }

  public changeTeam(teamId: number) {
    this.member.team = new Team(teamId, '');
  }

  public changeFunction(functionId: number) {
    this.member.function = new Fonction(functionId, '');
  }

}
