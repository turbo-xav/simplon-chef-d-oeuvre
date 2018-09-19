import { Component, OnInit } from '@angular/core';
import { Team } from '../models/team';
import { Member } from '../models/member';
import { OrganisationnalChartService } from '../services/organisationnal-chart.service';
import * as jquery from 'jquery';

declare let google: any;
@Component({
  selector: 'app-organizationchart',
  templateUrl: './organizationchart.component.html',
  styleUrls: ['./organizationchart.component.scss']
})
export class OrganizationchartComponent implements OnInit {

  topTeam: Team;

  public constructor(private organisationnalChartService: OrganisationnalChartService) {

  }

  private loadTeams() {

    let theTeam: Team = null;

    this.organisationnalChartService.getTopTeam().subscribe(
    (topTeam: Team) => {
       theTeam = topTeam;

      this.organisationnalChartService.getMembersFromTeam(topTeam).subscribe(
        (members: Member[]) => {
          topTeam.members = members;

          this.organisationnalChartService.getSubTeamsFromTopTeam().subscribe(
            (subTeams: Team[]) => {

              theTeam.teams = subTeams;
              for ( let i = 0 ; i < subTeams.length ; i++) {

                this.organisationnalChartService.getMembersFromTeam(subTeams[i]).subscribe(
                  (myMembers: Member[]) => {
                    subTeams[i].members = myMembers;
                    // console.log('complete subteams : ', subTeams[i].members);
                    // console.log('i = ' + i);
                    if ( i === (subTeams.length - 1) ) {
                      // console.log('i = ' + i);
                      this.initOrgChart(theTeam);
                    }
                }
                ,
                (error) => {
                  console.log(error);
                } ,
                () => {

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
    this.loadTeams();
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

          //console.log('team : ', 'i =' + i, topTeam.teams[i]);
          //console.log('members : ', 'i =' + i, topTeam.teams[i].members);

          const subTeamToInsert = {
            id : 'subTeam-' + subTeam.id ,
            name : subTeam.name ,
            functions: []
          };

          teamArboAndMembers.teams.push(subTeamToInsert);

          //console.log('members :', subTeam.members);
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
                        mail        : subTeam.members[j].mail           ,
                        tel         : subTeam.members[j].tel
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

  initOrgChart(topTeam) {

  google.charts.load('current', {packages: ['orgchart']});
  google.charts.setOnLoadCallback(drawChart);

  const arboTeam = this.createArbo(topTeam);

  function drawChart() {

    let indexAdd = 0;
    const indexesToCollapse = [];

    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Name');
    data.addColumn('string', 'Manager');
    data.addColumn('string', 'ToolTip');

      const myDatas: any[] = [];

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
                  f: '<p><span class="subTeam">' + myTeam.name + '</span></p>'
                }
                ,
                arboTeam.id           ,
                (myTeam.functions.length > 0) ? 'click top open / close' : 'no personn in this team'
              ];
              myDatas.push(subTeam);
             // console.log(subTeam);
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
                      f: '<p><span class="memberInfos">' + fonctionEc.name + '</span></p>'
                    }
                    ,
                    myTeam.id           ,
                    fonctionEc.description
                  ];

                  if ( fonctionEc.name !== 'Responsible') {
                    myDatas.push(myFunction);
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
                          f: '<p><span class="memberInfos">'
                          + memberEc.firstName + ' ' + memberEc.lastName
                          + '<a href="mailto:' + memberEc.mail + '">'
                          + memberEc.mail
                          + '</a></span></p>'
                        }
                        ,
                        (nextId != null) ? nextId : fonctionEc.id           ,
                        'click top open / close'
                      ];

                      if ( fonctionEc.name === 'Responsible') {
                        subTeam[0].f +=
                         '<p><span class="responsible">'
                        + memberEc.firstName + ' ' + memberEc.lastName
                        + '</span>'
                        + '<br />'
                        + '<a href="mailto:' + memberEc.mail + '"><img src="/assets/img/mail.png" /></a>'
                        + '<br /> <img src="/assets/img/tel.png" /> : ' + memberEc.tel
                        + '</p>'
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
      chart.draw(data, {allowHtml: true, allowCollapse: true, nodeClass: 'nodeCase', selectedNodeClass: 'selectedCase', size: 'large'});
      const childsRow = chart.getChildrenIndexes(0);

      for ( let i = 0 ; i < childsRow.length ; i++) {
        chart.collapse(childsRow[i], true);
      }

    // When the table is selected, update the orgchart.
    // The select handler. Call the chart's getSelection() method
    /*function selectHandler() {
    const selectedItem = chart.getSelection()[0];
    if (selectedItem) {
      for ( let i = 0 ; i < childsRow.length ; i++) {
        chart.collapse(childsRow[i], true);
      }
      chart.collapse(selectedItem.row, false);
    }
    }*/

    // Listen for the 'select' event, and call my function selectHandler() when
    // the user selects something on the chart.
    //google.visualization.events.addListener(chart, 'select', selectHandler);
    }
  }
}
