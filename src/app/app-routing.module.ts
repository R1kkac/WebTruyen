import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MangadetailComponent } from './component/manga/mangadetail/mangadetail.component';
import { ContentComponent } from './component/home/content/content.component';
import { NotfoundComponent } from './Service/servicecomponent/notfound/notfound.component';
import { ReadmangaComponent } from './component/manga/readmanga/readmanga.component';
import { AdsearchComponent } from './Tool/adsearch/adsearch.component';
import { TopmangaComponent } from './component/manga/topmanga/topmanga.component';
import { LoginComponent } from './component/user/login/login.component';
import { RegisterComponent } from './component/user/register/register.component';
import { ListmangaComponent } from './component/manga/listmanga/listmanga.component';
import { ResulttoppmangaComponent } from './component/manga/resulttoppmanga/resulttoppmanga.component';
import { ResultsearchComponent } from './Tool/resultsearch/resultsearch.component';
import { SlidebarComponent } from './component/home/slidebar/slidebar.component';
import { MangabycategoryComponent } from './component/manga/mangabycategory/mangabycategory.component';
import { HomeComponent } from './component/home/home/home.component';
import { UserpageComponent } from './component/user/userpage/userpage.component';
import { ForgotpasswordComponent } from './component/user/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './component/user/resetpassword/resetpassword.component';
import { MangapageComponent } from './component/manga/mangapage/mangapage.component';
import { InfouserComponent } from './component/user/infouser/infouser.component';
import { InfouserDetailsComponent } from './component/user/infouser-details/infouser-details.component';
import { InfouserReadhistoryComponent } from './component/user/infouser-readhistory/infouser-readhistory.component';
import { InfouserFollowingComponent } from './component/user/infouser-following/infouser-following.component';
import { CommentComponent } from './component/manga/comment/comment.component';
import { ReplycommentComponent } from './component/manga/replycomment/replycomment.component';
import { InfouserNotificationsComponent } from './component/user/infouser-notifications/infouser-notifications.component';
import { SearchComponent } from './Tool/search/search.component';
import { ChatpageComponent } from './component/chat/chatpage/chatpage.component';
import { ListroomchatComponent } from './component/chat/listroomchat/listroomchat.component';
import { ListuseractiveComponent } from './component/chat/listuseractive/listuseractive.component';
import { MainchatComponent } from './component/chat/mainchat/mainchat.component';

const routes: Routes = [
  {path: '' , component: HomeComponent, children:[
    {path: '' , component: ContentComponent, children: [
      {path: '' , component: MangapageComponent},
      {path: 'page/:page' , component: MangapageComponent},
    ]},
    {path: 'Manga/:id/:name' , component: MangadetailComponent},
    {path: 'Manga/:id/:name/:idchapter/:chapterIndex' , component: ReadmangaComponent, children:[
      {path: '', component : CommentComponent}
    ]},
    {path: 'The-loai/:idcategory', component: MangabycategoryComponent},
    {path: 'Search', component: SearchComponent, children:[
      {path:'', component: SlidebarComponent}
    ]},
    {path: 'Tim-kiem-nang-cao', component: AdsearchComponent, children:[
      { path: '', component: ResultsearchComponent},
      { path: ':type/Ket-Qua', component: ResultsearchComponent}
    ]},
    {path: 'Top-manga', component: TopmangaComponent, children:[
      { 
        path: '',
        redirectTo: '0',
        pathMatch: 'full'
      },
      { path: ':id', component: ResulttoppmangaComponent, data:{id:0}}]},
    {path: 'Manga/:type' , component: ListmangaComponent,data: {type: 'A-Z'}, children: [
      {path: '', component: SlidebarComponent} 
    ]},
    {path: 'user/:userid/:usernam', component: InfouserComponent, children: [
      {path: '', component: InfouserDetailsComponent},
      {path: 'history', component: InfouserReadhistoryComponent},
      {path: 'following', component: InfouserFollowingComponent},
      {path: 'notificatios', component: InfouserNotificationsComponent},
    ]},
    {path :'c', component: ChatpageComponent, children:[
      {path: '' , component: ListroomchatComponent, outlet: 'listroom'},
      {path: '' , component: MainchatComponent},
      {path: 'room/:roomId/:roomName' , component: MainchatComponent, children:[
        { path: '', component: ListuseractiveComponent}
      ]},
    ]},
  ]},
  {path: 'oAuth', component: UserpageComponent, children:[
    {path: 'login' , component: LoginComponent},
    {path: 'register' , component: RegisterComponent},
    {path: 'forgotpassword' , component: ForgotpasswordComponent},
    {path: 'resetpassword', component: ResetpasswordComponent}
  ]},
  {path: '**' , component: NotfoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
