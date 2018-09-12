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
        (error) => {
          console.log(error);
        }
        ,
        () => {
          console.log('complete');
      }
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
    //console.log('createArbo');
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

                  const functionId = 'team-' + subTeam.id + '-function-' + subTeam.members[j].function.id;
                  let functionFound = subTeamToInsert.functions.find( function(myFunction) {
                    return myFunction.id === functionId;
                  });

                  if (!functionFound) {
                    functionFound = {
                      id: functionId,
                      name  :  subTeam.members[j].function.name,
                      description: subTeam.members[j].function.description,
                      members : []
                    };
                      subTeamToInsert.functions.push
                      (functionFound );
                  }

                  functionFound.members.push(
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

  google.charts.load('current', {packages: ['orgchart']});
  google.charts.setOnLoadCallback(drawChart);
  const arboTeam = this.createArbo(this.topTeam);

  function drawChart() {

    let indexAdd = 0;
    const indexesToCollapse = [];

    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Name');
    data.addColumn('string', 'Manager');
    data.addColumn('string', 'ToolTip');

      const myDatas: any[] = [];

      console.log(arboTeam);
      if ( arboTeam != null ) {

        // Ajout du Top manager
        const bigBoss = [
          {
            v: arboTeam.id							,
            f:
            '<p>'
            + '<span class="team">'
            + arboTeam.name
            + '</span>'
            +  ' :<br />'
            + '<span class="responsible">'
            + arboTeam.functions[0].members[0].firstName
            + ' '
            + arboTeam.functions[0].members[0].lastName
            + '</span>'
            + '<br />'
            + '<a href="mailto:' + arboTeam.functions[0].members[0].mail + '">' + arboTeam.functions[0].members[0].mail + '</a>'
            // + ' : '
            // + arboTeam.functions[0].name
            + '</p>'
          },
            '',
            'click top open / close'
          ];

           myDatas.push(bigBoss);
           indexAdd++;

          // Ajout des sous équipes
          if (arboTeam.teams.length > 0) {
            for ( let i = 0 ; i < arboTeam.teams.length ; i++ ) {
              const myTeam =  arboTeam.teams[i];

              const subTeam = [
                {
                  v: myTeam.id ,
                  f: myTeam.name
                }
                ,
                arboTeam.id           ,
                'click top open / close'
              ];
              myDatas.push(subTeam);
              indexesToCollapse.push(indexAdd);
              indexAdd++;


              // Ajout de la fonction à l'équipe
              if ( myTeam.functions.length > 0) {
                const functions = myTeam.functions;
                for ( let j = 0 ; j < functions.length ; j++ ) {

                  const fonctionEc = functions[j];

                  const myFunction = [
                    {
                      v: fonctionEc.id ,
                      f: fonctionEc.name
                    }
                    ,
                    myTeam.id           ,
                    fonctionEc.description
                  ];

                  if ( fonctionEc.name !== 'Responsible') {
                    myDatas.push(myFunction);
                   // indexesToCollapse.push(indexAdd);
                    indexAdd++;
                  }

                  // Ajout des membres à une fonction
                  if ( fonctionEc.members.length > 0 ) {
                    let nextId = null;
                    for ( let k = 0 ; k < fonctionEc.members.length ; k ++) {

                      const memberEc =  fonctionEc.members[k];

                      const myMember = [
                        {
                          v: memberEc.id ,
                          f: '<p>' + memberEc.firstName + memberEc.lastName
                          + '<br /><a href="mailto:' + memberEc.mail + '">' + memberEc.mail + '</a>'
                          + '</p>'
                        }
                        ,
                        (nextId != null) ? nextId : fonctionEc.id           ,
                        'click top open / close'
                      ];

                      if ( fonctionEc.name === 'Responsible') {
                        subTeam[0].f +=
                         '<br /><span class="responsible">'
                        + memberEc.firstName + ' ' + memberEc.lastName
                        + '</span>'
                        + '<br />'
                        + '<a href="mailto:' + memberEc.mail + '">' + memberEc.mail + '</a>'
                       ;
                      } else {
                        myDatas.push(myMember);
                        indexAdd++;
                        nextId = memberEc.id;
                      }
                    }
                  }
                }
              }
            }
          }
        }

      data.addRows(myDatas);

    

      // Create the chart.
      const chart = new google.visualization.OrgChart(document.getElementById('organisation'));

      // Draw the chart, setting the allowHtml option to true for the tooltips.
      chart.draw(data, {allowHtml: true, allowCollapse: true,  selectedNodeClass: '', size: 'medium'});
      // tslint:disable-next-line:forin
      for ( const keyToCollapse in indexesToCollapse ) {
        chart.collapse(indexesToCollapse[keyToCollapse], true);
      }
    }
  }
}
