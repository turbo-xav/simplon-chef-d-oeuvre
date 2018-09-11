import { MatIconModule } from '@angular/material/icon';
import { Member } from './../models/member';
import { Subject } from 'rxjs/Subject';
import { Subscriber } from 'rxjs/Subscriber';
import { TeamService } from './../services/team.service';
import { Component, OnInit } from '@angular/core';
import { Team } from '../models/team';
import { Member } from '../models/member';
declare let google: any;
@Component({
  selector: 'app-organizationchart',
  templateUrl: './organizationchart.component.html',
  styleUrls: ['./organizationchart.component.scss']
})
export class OrganizationchartComponent implements OnInit {

  topTeam: Team;

  public constructor(private teamService: TeamService) {
    this.loadTeams();
  }

  private loadTeams() {

    this.teamService.getTopTeam().subscribe(
    (topTeam: Team) => {

      this.topTeam = topTeam;

      this.teamService.getMembersFromTeam(topTeam).subscribe(
        (members: Member[]) => {
          topTeam.members = members;

          this.teamService.getSubTeamsFromTopTeam().subscribe(
            (subTeams: Team[]) => {
              this.topTeam.teams = subTeams;
              for ( let i = 0 ; i < subTeams.length ; i++) {
                this.teamService.getMembersFromTeam(subTeams[i]).subscribe(
                  (myMembers: Member[]) => {
                    subTeams[i].members = myMembers;
                    if ( i === (subTeams.length - 1) ) {
                      this.initOrgChart();
                    }
                }
              );
            }
           }
          );
        }
        ,
        (error) => { console.log(error); }
        ,
        () => { console.log('complete'); }
      );
    });
}

  ngOnInit() {

  }

  /**
    * 
    * Création de l'arborscence
    *
    * team {
    *       id :
    *       name:
    *       functions:[
    *                 function : name
    *                 members: []
    * ]
    * ,
    * teams[
    *   team {
    *         id :
    *         name:
    *         functions:[
    *                   function : name
    *                    members: []
    *         }
    * ]
    *
    *
    * 
    */
  
  private createArbo(topTeam: Team) {
    console.log('createArbo');
    let teamArboAndMembers = null;

    if ( topTeam != null ) {
      if ( topTeam != null ) {
        // Ajout du Top manager
        teamArboAndMembers = {
          id : 'topTeam-' + topTeam.id      ,
          name: topTeam.name	 ,
          functions : [
            {
              name: topTeam.members[0].function.name,
              members : [ topTeam.members[0] ],
            }
        ]
        ,
        teams : []
        };
      }

      // Ajout des sous équipes
      if ( topTeam.teams.length > 0 ) {
        for ( let i = 0 ; i < topTeam.teams.length ; i++ ) {

          const subTeam: Team = topTeam.teams[i];

          const subTeamToInsert = {
            id : 'subTeam-' + subTeam.id ,
            name : subTeam.name ,
            functions: []
          };

          teamArboAndMembers.teams.push(subTeamToInsert);


          if ( subTeam.members) {
            if ( subTeam.members.length > 0) {
              for ( let j = 0 ; j < subTeam.members.length ; j++ ) {
                if ( subTeam.members[j].function) {
                  const type = typeof(subTeamToInsert.functions[subTeam.members[j].function.id]);
                  if ( type === 'undefined') {
                      subTeamToInsert.functions[subTeam.members[j].function.id]
                      = {
                        id: subTeamToInsert.id + '-function-' + subTeam.members[j].function.id,
                        name  : subTeam.members[j].function.name,
                        members : []
                      };
                    } 

                    subTeamToInsert.functions[subTeam.members[j].function.id].members.push(
                      {
                        id          : 'member-' + subTeam.members[j].id ,
                        firstName   : subTeam.members[j].firstName      ,
                        lastName    : subTeam.members[j].lastName       ,
                        mail        : subTeam.members[j].mail
                      }
                    );
                }
              }
            }
          }
        }
      }
    }
    return teamArboAndMembers;
  }

  initOrgChart() {
    console.log('initOrgChart');
    google.charts.load('current', {packages: ['orgchart']});
    google.charts.setOnLoadCallback(drawChart);


   const arboTeam = this.createArbo(this.topTeam);

   function drawChart() {

    const data = new google.visualization.DataTable();
      data.addColumn('string', 'Name');
      data.addColumn('string', 'Manager');
      data.addColumn('string', 'ToolTip');


      const myDatas: any[] = [];

      //let teamArboAndMembers = null;
    console.log(arboTeam);
      if ( arboTeam != null ) {

        const bigBoss = [
          {
            v: arboTeam.id							,
            f: arboTeam.name +  ' <br />'
            + arboTeam.functions[0].members[0].firstName
            + ' '
            + arboTeam.functions[0].members[0].lastName
            + ' : '
            + arboTeam.functions[0].name  },
            '',
            'click top open / close'];

          myDatas.push(bigBoss);

          // Ajout du Top manager
         /* teamArboAndMembers = {
            id : 'topTeam-' + arboTeam.id      ,
            name: arboTeam.name	 ,
            functions : [
              {
                name: arboTeam.members[0].function.name,
                members : [ arboTeam.members[0] ],
              }
          ]
          ,
          teams : []
          };*/


        // Ajout du Top manager
       /* const bigBoss = [
          {
            v: teamArboAndMembers.name							,
            f: teamArboAndMembers.name +  ' <br />'
            + teamArboAndMembers.functions[0].members[0].firstName
            + ' '
            + teamArboAndMembers.functions[0].members[0].lastName
            + ' : '
            + teamArboAndMembers.functions[0].name  },
            '',
            'click top open / close'];*/

         //myDatas.push(bigBoss);

        // Ajout des sous équipes
        /*if ( arboTeam.teams.length > 0 ) {
          for ( let i = 0 ; i < arboTeam.teams.length ; i++ ) {

            const subTeam: Team = arboTeam.teams[i];

            const subTeamToInsert = {
              id : 'subTeam-' + subTeam.id ,
              name : subTeam.name ,
              functions: []
            };

            teamArboAndMembers.teams.push(subTeamToInsert);
            }
      }*/
      data.addRows(myDatas);

      // Create the chart.
      const chart = new google.visualization.OrgChart(document.getElementById('organisation'));

      // Draw the chart, setting the allowHtml option to true for the tooltips.
      chart.draw(data, {allowHtml: true, allowCollapse: true,  selectedNodeClass: '', size: 'medium'});

    }
  }
}

