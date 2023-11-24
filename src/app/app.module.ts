import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './home/header/header.component';
import { FooterComponent } from './home/footer/footer.component';
import { ContentComponent } from './home/content/content.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModulo } from './material.module';
import { HotkeymenuComponent } from './home/hotkeymenu/hotkeymenu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MangadetailComponent } from './manga/mangadetail/mangadetail.component';
import { ReadmangaComponent } from './manga/readmanga/readmanga.component';
import { NotfoundComponent } from './Service/servicecomponent/notfound/notfound.component';
import { SlidebarComponent } from './home/slidebar/slidebar.component';
import { ImageErrorDirective } from './Service/image-error.directive';
import { AdsearchComponent } from './Tool/adsearch/adsearch.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    HotkeymenuComponent,
    MangadetailComponent,
    ReadmangaComponent,
    NotfoundComponent,
    SlidebarComponent,
    ImageErrorDirective,
    AdsearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModulo,
    FontAwesomeModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
