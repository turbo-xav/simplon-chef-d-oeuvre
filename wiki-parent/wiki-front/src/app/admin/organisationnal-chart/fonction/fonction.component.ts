import { Component, OnInit } from '@angular/core';
import { Fonction } from '../../../models/fonction';
import { HttpErrorResponse } from '@angular/common/http';
import { FonctionService } from '../../../services/fonction.service';

@Component({
  selector: 'app-fonction',
  templateUrl: './fonction.component.html',
  styleUrls: ['./fonction.component.scss']
})
export class FonctionComponent implements OnInit {

  fonctionsMembers: Fonction[] = [];
  error: Error;
  constructor(private fonctionService: FonctionService ) {
  }

  ngOnInit() {
    this.loadFonctionsMembers();
  }

  delete(id: number) {
      this.fonctionService.deleteFonction(id).subscribe(
          () => {
            this.loadFonctionsMembers();
        }
      );
  }

  loadFonctionsMembers() {
    this.fonctionService.getFonctions().subscribe(
      (fonctionsMembers: Fonction[]) => {
        this.fonctionsMembers = fonctionsMembers;
      },
      (response: HttpErrorResponse) => {
        this.error = response.error;
      }
    );
  }

}
