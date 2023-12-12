import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Service/user.service';
import { isLogin } from 'src/app/Service/website-service.service';

@Component({
  selector: 'app-infouser-following',
  templateUrl: './infouser-following.component.html',
  styleUrls: ['./infouser-following.component.scss']
})
export class InfouserFollowingComponent implements OnInit{

  listmanga: any[]=[];
  Id: any;
  constructor(private userService: UserService, private isLogin: isLogin, private router: Router, private toastr: ToastrService){}
  ngOnInit(): void {
    this.isLogin.isLogin$.subscribe((result: any)=>{
      const user= JSON.parse(result.user);
      this.Id=user.id;
    })
    this.userService.danhSachTruyenTheoDoi(this.Id).subscribe((item: any)=>{
      //console.log(item);

      this.listmanga = item;
    })
  }
  infomanga(input: any){
    const Id= input.mangaId;
    const name= input.mangaName.replace(/ /g,'-');
    this.router.navigate([`Manga/${Id}/${name}`]);
  }
  unsubscribe(item: any){
    this.userService.huyTheoDoitruyen(this.Id, item.mangaId).subscribe({
      next: (result: any)=>{
        if(result.status === 'Success'){
          this.toastr.success(result.message);
          const index = this.listmanga.findIndex(x=> x.mangaId === item.mangaId);
          if(index !== -1){
            this.listmanga.splice(index, 1);
          }
        }else{
          this.toastr.success(result.message);
        }
      },
      error: (err: any)=>{
        this.toastr.error('Đã xảy ra lỗi');
      }
    })
  }
}
