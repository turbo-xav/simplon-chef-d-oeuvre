import { Subject } from 'rxjs/Subject';
import { Subscriber } from 'rxjs/Subscriber';
import { TeamService } from './../services/team.service';
import { Component, OnInit } from '@angular/core';
import { Team } from '../models/team';
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

      this.teamService.getSubTeamsFromTopTeam().subscribe(
        (subTeams: Team[]) => {
          this.topTeam.teams = subTeams;
          this.initOrgChart();
        }
      );
    }
    );
  }

  ngOnInit() {
  }

  initOrgChart() {

    google.charts.load('current', {packages: ['orgchart']});
    google.charts.setOnLoadCallback(drawChart);

   const topTeam = this.topTeam;

   function drawChart() {

    const data = new google.visualization.DataTable();
      data.addColumn('string', 'Name');
      data.addColumn('string', 'Manager');
      data.addColumn('string', 'ToolTip');


      const myDatas: any[] = [];
      if ( topTeam != null ) {
        myDatas.push([{v: 'Dimitri'							, f: topTeam.name + ' Dimitri  Rorigues - Responsible'}, '', 'Big Boss']);

        if ( topTeam.teams.length > 0 ) {
          for ( let i = 0 ; i < topTeam.teams.length ; i++ ) {
            myDatas.push([{v: topTeam.teams[i].name, f: topTeam.teams[i].name}, 'Dimitri', 'm\en bat les couilles']);
          }
        }

        console.log(myDatas);

        //myDatas.push([{v: 'BE'									    , f: 'Bureau d\'étude'}, topTeam.name, 'm\en bat les couilles']);
        //myDatas.push([{v: 'SquadSouscription'			, f: 'Squad Souscription - Xavier Tagliarino - (Responsible)'}, topTeam.name, '']);
        //myDatas.push([{v: 'SquadRelationCompte'		, f: 'Squad Relation de Compte - Laurent KOWALCZYK (Responsible'}, topTeam.name, '']);
        //myDatas.push([{v: 'SquadProspection'				, f: 'Squad Prospection Ilizette BOAVENTURA (Responsible)'}, topTeam.name, '']);

      }
      data.addRows(myDatas);


      /*data.addRows([
        [{v: topTeam.name							, f: topTeam.name + ' Dimitri  Rorigues - Responsible'}, '', 'Big Boss'],



        [{v: 'BE'									    , f: 'Bureau d\'étude'}, topTeam.name, 'm\en bat les couilles'],

        [{v: 'SquadSouscription'			, f: 'Squad Souscription - Xavier Tagliarino - (Responsible)'}, topTeam.name, ''],
        [{v: 'SquadRelationCompte'		, f: 'Squad Relation de Compte - Laurent KOWALCZYK (Responsible'}, topTeam.name, ''],
        [{v: 'SquadProspection'				, f: 'Squad Prospection Ilizette BOAVENTURA (Responsible)'}, topTeam.name, ''],

        [{v: 'BusinnessAnalystsSquadSouscription'	, f: 'Businness Analysts'}, 'SquadSouscription', ''],
        [{v: 'DeveloperSquadSouscription'			, f: 'Developpers'}, 'SquadSouscription', ''],
        [{v: 'dev1'			, f: '<p>Developper 1<br />Developper 2<br />Developper 3<p>'}, 'DeveloperSquadSouscription', ''],

        [{v: 'ScrumMasterSquadSouscription'		, f: 'Scrum Master'}, 'SquadSouscription', ''],
        [{v: 'TechLeadSquadSouscription'			, f: 'Tech Lead'}, 'SquadSouscription', ''],

        [{v: 'BusinnessAnalystsSquadRelationCompte', f: 'Businness Analysts'}, 'SquadRelationCompte', ''],
        [{v: 'DeveloperSquadRelationCompte'		, f: 'Developpers'}, 'SquadRelationCompte', ''],
        [{v: 'ScrumMasterSquadRelationCompte'		, f: 'Scrum Master'}, 'SquadRelationCompte', ''],
        [{v: 'TechLeadSquadRelationCompte'			, f: 'Tech Lead'}, 'SquadRelationCompte', ''],

        [{v: 'BusinnessAnalystsSquadProspection'	, f: 'Businness Analysts'}, 'SquadProspection', ''],
        [{v: 'DeveloperSquadProspection'			, f: 'Developpers'}, 'SquadProspection', ''],
        [{v: 'ScrumMasterSquadProspection'		, f: 'Scrum Master'}, 'SquadProspection', ''],
        [{v: 'TechLeadSquadProspection'			, f: 'Tech Lead'}, 'SquadProspection', '']
      ]);*/

      // Create the chart.
      const chart = new google.visualization.OrgChart(document.getElementById('organisation'));

      // Draw the chart, setting the allowHtml option to true for the tooltips.
      chart.draw(data, {allowHtml: true, allowCollapse: true,  selectedNodeClass: '', size: 'medium'});

    }
  }
}

