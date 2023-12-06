import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent {
  forgotpasswordform: FormGroup;
  constructor(private formbuider: FormBuilder){
    this.forgotpasswordform = this.formbuider.group({
      email: new FormControl('', Validators.email)
    })
  }

}
