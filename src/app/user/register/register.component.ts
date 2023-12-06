import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerform: FormGroup;

  error_messages = {
    'name': [
      { type: 'required', message: 'Yêu cầu*' },
    ],
    'email': [
      { type: 'required', message: 'Yêu cầu*' },
      { type: 'email', message: 'Địa chỉ email không đúng*' }
    ],

    'password': [
      { type: 'required', message: 'Yêu cầu' },
      { type: 'minlength', message: 'Tối thiểu 6 ký tự*' },
      { type: 'maxlength', message: 'Tối đa 30 ký tự*' },
    ],
    'confirmpassword': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'Tối thiểu 6 ký tự*' },
      { type: 'maxlength', message: 'Tối đa 30 ký tự*' },
    ],
  }

  constructor(
    public formBuilder: FormBuilder
  ) {
    this.registerform = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ])),
      confirmpassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ])),
    }, { 
      validators: this.password.bind(this)
    });
  }

  ngOnInit() {
  }

  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password')!;
    const { value: confirmPassword } = formGroup.get('confirmpassword')!;
    if(password.length> 0 && confirmPassword.length>0){
      return password === confirmPassword ? null : { passwordNotMatch: true };
    }
    return null;
  }
}
