import { Component, OnInit } from '@angular/core';
import { Fonction } from '../../../../models/fonction';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FonctionService } from '../../../../services/fonction.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-fonction-edit',
  templateUrl: './fonction-edit.component.html',
  styleUrls: ['./fonction-edit.component.scss']
})
export class FonctionEditComponent implements OnInit {

  fonction: Fonction;
  error: Error;
  roleForm: FormGroup;

  constructor(private fb: FormBuilder, private fonctionService: FonctionService, private router: Router, private route: ActivatedRoute ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if ( id != null ) {
      this.fonctionService.getFonction(Number(id)).subscribe(
        (fonction: Fonction) => {
          if ( fonction != null ) {
            this.fonction = fonction;
          } else {
            this.router.navigateByUrl('/admin/organisationnal-chart/function');
          }
        }
      );
    } else {
      this.fonction = new Fonction(null, '');
    }

    this.createFormControls();
  }

  createFormControls() {
    const name = new FormControl('', [Validators.required]);
    const description = new FormControl('');

    this.roleForm = this.fb.group({
      name: name,
      description: description
    });
  }

  get name() {
    return this.roleForm.get('name');
  }

  get description() {
    return this.roleForm.get('description');
  }

  save() {
    this.error = null;
    if ( this.roleForm.valid ) {
      this.fonctionService.saveFonction(this.fonction).subscribe(
        () => {
          this.router.navigateByUrl('/admin/organisationnal-chart/function');
        },
        (response: HttpErrorResponse) => {
          this.error = response.error;
        }
      );
    }
  }

}
