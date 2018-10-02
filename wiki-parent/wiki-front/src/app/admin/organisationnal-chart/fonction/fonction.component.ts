import { Component, OnInit } from '@angular/core';
import { Fonction } from '../../../models/fonction';
import { HttpErrorResponse } from '@angular/common/http';
import { FonctionService } from '../../../services/fonction.service';
import { DataTableUtils } from '../../../utils/dataTableUtils';

@Component({
  selector: 'app-fonction',
  templateUrl: './fonction.component.html',
  styleUrls: ['./fonction.component.scss']
})
export class FonctionComponent implements OnInit {

  fonctionsMembers: Fonction[] = [];
  error: Error;
  constructor(private fonctionService: FonctionService, private dataTableUtils: DataTableUtils ) {
  }

  ngOnInit() {
    this.loadFonctionsMembers();
  }

  delete(id: number) {
      this.fonctionService.deleteFonction(id).subscribe(
          () => {
            this.dataTableUtils.remove(id);
            this.loadFonctionsMembers();
        }
      );
  }

  private gererateDataTable(): void {
    this.dataTableUtils.generate();
  }

  loadFonctionsMembers() {
    this.fonctionService.getFonctions().subscribe(
      (fonctionsMembers: Fonction[]) => {
        this.fonctionsMembers = fonctionsMembers;
        this.gererateDataTable();
      },
      (response: HttpErrorResponse) => {
        this.error = response.error;
      }
    );
  }

}
