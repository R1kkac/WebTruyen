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

const routes: Routes = [
  {path: '' , component: ContentComponent},
  {path: 'Login' , component: LoginComponent},
  {path: 'Register' , component: RegisterComponent},
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
  {path: '**' , component: NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
