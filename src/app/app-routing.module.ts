import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MangadetailComponent } from './manga/mangadetail/mangadetail.component';
import { ContentComponent } from './home/content/content.component';
import { NotfoundComponent } from './Service/servicecomponent/notfound/notfound.component';
import { ReadmangaComponent } from './manga/readmanga/readmanga.component';
import { AdsearchComponent } from './Tool/adsearch/adsearch.component';
import { TopmangaComponent } from './manga/topmanga/topmanga.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ListmangaComponent } from './manga/listmanga/listmanga.component';
import { ResulttoppmangaComponent } from './manga/resulttoppmanga/resulttoppmanga.component';
import { ResultsearchComponent } from './Tool/resultsearch/resultsearch.component';
import { SlidebarComponent } from './home/slidebar/slidebar.component';
import { MangabycategoryComponent } from './manga/mangabycategory/mangabycategory.component';
import { HomeComponent } from './home/home/home.component';
import { UserpageComponent } from './user/userpage/userpage.component';
import { ForgotpasswordComponent } from './user/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './user/resetpassword/resetpassword.component';
import { MangapageComponent } from './manga/mangapage/mangapage.component';
import { InfouserComponent } from './user/infouser/infouser.component';
import { InfouserDetailsComponent } from './user/infouser-details/infouser-details.component';
import { InfouserReadhistoryComponent } from './user/infouser-readhistory/infouser-readhistory.component';
import { InfouserFollowingComponent } from './user/infouser-following/infouser-following.component';

const routes: Routes = [
  {path: '' , component: HomeComponent, children:[
    {path: '' , component: ContentComponent, children: [
      {path: '' , component: MangapageComponent},
      {path: 'page/:page' , component: MangapageComponent}
    ]},
    {path: 'Manga/:id/:name' , component: MangadetailComponent},
    {path: 'Manga/:id/:name/:idchapter/:chaptername' , component: ReadmangaComponent},
    {path: 'The-loai/:idcategory', component: MangabycategoryComponent},
    {path: 'Tim-kiem-nang-cao', component: AdsearchComponent, children:[
      { path: '', component: ResultsearchComponent},
      { path: 'Ket-Qua', component: ResultsearchComponent}
    ]},
    {path: 'Top-manga', component: TopmangaComponent, children:[
      { 
        path: '',
        redirectTo: 'All',
        pathMatch: 'full'
      },
      { path: ':nametype', component: ResulttoppmangaComponent, data:{nametype: 'All'}}]},
    {path: 'Manga/All' , component: ListmangaComponent, children: [{path: '', component: SlidebarComponent}]},
    {path: 'user/:userid/:usernam', component: InfouserComponent, children: [
      {path: '', component: InfouserDetailsComponent},
      {path: 'history', component: InfouserReadhistoryComponent},
      {path: 'following', component: InfouserFollowingComponent},
    ]}
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
