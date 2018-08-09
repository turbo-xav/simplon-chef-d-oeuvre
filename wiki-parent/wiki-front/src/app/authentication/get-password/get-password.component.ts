import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '../../../../node_modules/@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-get-password',
  templateUrl: './get-password.component.html',
  styleUrls: ['./get-password.component.scss']
})
export class GetPasswordComponent implements OnInit {

  getForm: FormGroup;

  userUid: string;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.createFormControls();
  }

  createFormControls() {

    const uid = new FormControl('', [Validators.required, Validators.maxLength(6), Validators.minLength(6)]);

    this.getForm = this.fb.group({
       uid: uid
    });
  }

  get uid() {
    return this.getForm.get('uid');
  }

  reset(){
    this.router.navigateByUrl('/');
  }

}
