import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent {
  forgotpasswordform: FormGroup;
  constructor(private formbuider: FormBuilder, private userService: UserService, private toastr: ToastrService){
    this.forgotpasswordform = this.formbuider.group({
      email: new FormControl('', Validators.email)
    })
  }

  forgotpassword(){
    const email= this.forgotpasswordform.get('email')?.value;
    console.log(email);
    if(email!= null){
      this.userService.forgotpassword(email).subscribe({
        next: (result: any)=>{
          if(result.status === 'Success'){
            this.toastr.success(result.message);
          }
        },
        error: (error: any)=>{
          if(error && error.status === 400){
            this.toastr.error('Thông tin không chính xác');
          }else if(error && error.status === 0){
            this.toastr.warning('Lỗi kết nối tới máy chủ')
          }
        }
      })
    }
  }
}
