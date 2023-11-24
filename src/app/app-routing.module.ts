import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MangadetailComponent } from './manga/mangadetail/mangadetail.component';
import { ContentComponent } from './home/content/content.component';
import { NotfoundComponent } from './Service/servicecomponent/notfound/notfound.component';
import { ReadmangaComponent } from './manga/readmanga/readmanga.component';
import { AdsearchComponent } from './Tool/adsearch/adsearch.component';

const routes: Routes = [
  {path: '' , component: ContentComponent},
  {path: 'Manga/:id/:name' , component: MangadetailComponent},
  {path: 'Manga/:id/:name/:idchapter/:chaptername' , component: ReadmangaComponent},
  {path: 'Tim-kiem-nang-cao', component: AdsearchComponent},
  {path: '**' , component: NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
