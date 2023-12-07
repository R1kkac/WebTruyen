import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit, AfterViewInit{
  resetpasswordform: FormGroup;
  isResetpassword= false;
  email: any;
  token: any;
  show: boolean =false;
  show1: boolean =false;
  @ViewChild('email') emailelement!: ElementRef;
  @ViewChild('token') tokenelement!: ElementRef;
  @ViewChild('input1') input1!: ElementRef;
  @ViewChild('input2') input2!: ElementRef;

  error_messages = {
    'password': [
      { type: 'required', message: 'Yêu cầu*' },
      { type: 'minlength', message: 'Tối thiểu 6 ký tự*' },
      { type: 'maxlength', message: 'Tối đa 30 ký tự*' },
    ],
    'confirmpassword': [
      { type: 'required', message: 'Yêu cầu*' },
      { type: 'minlength', message: 'Tối thiểu 6 ký tự*' },
      { type: 'maxlength', message: 'Tối đa 30 ký tự*' },
    ],
  }
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private userService: UserService,
    private toastr: ToastrService){
    this.resetpasswordform = this.formBuilder.group({
      token: new FormControl(''),
      email: new FormControl(''),
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
  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password')!;
    const { value: confirmPassword } = formGroup.get('confirmpassword')!;
    if(password.length> 0 && confirmPassword.length>0){
      return password === confirmPassword ? null : { passwordNotMatch: true };
    }
    return null;
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      const email= params['email'];
      const token= params['token'];
      this.email= email;
      this.token= token
    })
  }
  ngAfterViewInit(): void {
    const email= this.emailelement.nativeElement;
    const token= this.tokenelement.nativeElement;
    email.value = this.email;
    token.value=this.token;
  }
  showandhide(input: number){
    if( input ===1){
      const element= this.input1.nativeElement;
      if(this.show === false){
        element.innerHTML ='<i class="fa-solid fa-eye"></i>';
        this.show = true;
      }else{
        element.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
        this.show = false;
      }
    }else if( input ===2){
      const element= this.input2.nativeElement;
      if(this.show1 === false){
        element.innerHTML ='<i class="fa-solid fa-eye"></i>';
        this.show1 = true;
      }else{
        element.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
        this.show1 = false;
      }
    }
  }
  resetpassword(){
    const password= this.resetpasswordform.get('password')?.value;
    const confirmPassword= this.resetpasswordform.get('confirmpassword')?.value;
    if(password === confirmPassword){
      this.userService.resetpassword(this.email, this.token, password).subscribe((result: any)=>{
        console.warn(result);
        if(result.status === 'Success'){
          this.toastr.success('Đã đặt lại mật khẩu thành công');
        }
      });
    }
  }
}
