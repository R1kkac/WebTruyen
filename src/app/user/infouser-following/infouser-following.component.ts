import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private userService: UserService, private isLogin: isLogin, private router: Router){}
  ngOnInit(): void {
    this.isLogin.isLogin$.subscribe((result: any)=>{
      const user= JSON.parse(result.user);
      this.Id=user.id;
    })
    this.userService.danhSachTruyenTheoDoi(this.Id).subscribe((item: any)=>{
      this.listmanga = item;
    })
  }
  infomanga(input: any){
    const Id= input.mangaId;
    const name= input.mangaName.replace(/ /g,'-');
    this.router.navigate([`Manga/${Id}/${name}`]);
  }
}
