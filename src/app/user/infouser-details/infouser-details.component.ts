import { Component, ElementRef, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Service/user.service';
import { PopupMessageService, WebsiteServiceService, cookie, isLogin } from 'src/app/Service/website-service.service';

@Component({
  selector: 'app-infouser-details',
  templateUrl: './infouser-details.component.html',
  styleUrls: ['./infouser-details.component.scss']
})
export class InfouserDetailsComponent implements OnInit{
  user: any;
  Id: any;
  isEdit= false;
  isChangePassword= false;
  err='';
  err2='';
  err3='';
  errpass='';
  disable=true;
  avatar: any ='../assets/user.jpg';
  constructor(private userService: UserService, private isLogin: isLogin, private title: Title, private toastr: ToastrService,
    private websiteService: WebsiteServiceService, private popup: PopupMessageService){}
  ngOnInit(): void {
    this.isLogin.isLogin$.subscribe((item:any)=>{
      const a= JSON.parse(item.user);
      this.Id = a.id;
      this.title.setTitle(`${a.name}`);
    })
    this.userService.infouser(this.Id).subscribe((result: any)=>{
      this.user = result;
      //console.log(this.user);
    })
  }
  edit(){
    this.isEdit = !this.isEdit;
  }
  changepassword(){
    this.isChangePassword = !this.isChangePassword;

  }
  editInfo(input: any){
    this.err='';
    const name= input.target[0].value || '';
    const phone= input.target[1].value || '';
    const avatar: File= input.target[2].files[0];
    if(name.length == 0 && phone.length == 0 && avatar == undefined){
      this.err='Phải điền ít nhất một thông tin'
      setTimeout(() => {
        this.err='';
      }, 3000);
    }
    else{
      const user:user={
        email: this.user.email,
        name: name,
        phone: phone,
      }
      this.userService.edituser(user, avatar).subscribe({
        next: (result: any)=>{
          if(result.status == 'Success'){
            this.toastr.success('Đã thay đổi thông tin thành công');
            this.afterEditSuccess();
          }
          else{
            this.toastr.error('Thay đổi thông tin thất bại');
          }
        },
        error: (err:any)=>{
          this.toastr.warning('Lỗi kết nối tới máy chủ');
        }
      })
    }
  }
  afterEditSuccess(){
    this.userService.infouser(this.Id).subscribe((result: any)=>{
      this.user = result;
      this.isLogin.isLogin$.subscribe(item=>{
        const token= item.token;
        const usercookie: usercookie={
          avatar: this.user.avatar,
          name: this.user.name,
          id: this.user.id
        }
        this.websiteService.SetCookie(token, usercookie);
        window.location.reload();
      }) 
    }); 
  }
  changePasswordinfo(input: any){
    const curpass= input.target[0].value || '';
    const newpass= input.target[1].value || '';
    const conewpass= input.target[2].value || '';
    if(curpass.length ==0 || newpass.length== 0 || conewpass.length ==0){
      this.popup.showMessage('Bạn phải nhập đầy đủ thông tin');
    }
    const user: userChangePass={
      email: this.user.email,
      oldpassword: curpass,
      newpassword: newpass
    }
    this.userService.changepassword(user).subscribe({
      next: (result:any)=>{
        if(result == true){
          this.toastr.success('Thành công');
        }else{
          this.toastr.error('Thất bại');
        }
      },
      error: (err:any)=>{
        this.toastr.warning('Lỗi kết nối đến mày chủ');
      }
    })

  }
  checkPasswordinput(input: any){
    var element = input.target.value;
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(!regex.test(element)){
      this.err2='Mật khẩu phải bao gồm chữ, chữ hoa, số và ký tự đặc biệt và có ít nhất 8 ký tự';
      this.disable = true;
    }else{
      this.err2='';
    }

  }
  checkpassword(newpass: any, confirmnewpass: any){
    this.err3='';
    const comfirm= confirmnewpass.target.value || '';
    if(newpass !== comfirm){
      this.err3='Mật khẩu và xác nhận mật khẩu không khớp';
      this.disable = true;
    }
    else{
      this.err3='';
      this.disable= false;
    }
  }
  getimage(event: any){
    const avatar: File= event.target.files[0];
    if (avatar) {
      this.readImage(avatar);
    }

  }
  readImage(avatar: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.avatar = e.target.result;
    };
    reader.readAsDataURL(avatar);
  }
}
export interface user{
  email: string;
  name: string;
  phone: string;
}
export interface userChangePass{
  email: string;
  oldpassword: string;
  newpassword: string;
}
export interface usercookie{
  avatar: string;
  id: string;
  name: string;
}
