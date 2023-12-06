import { APP_INITIALIZER, NgModule } from '@angular/core';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TopmangaComponent } from './manga/topmanga/topmanga.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ListmangaComponent } from './manga/listmanga/listmanga.component';
import { ResulttoppmangaComponent } from './manga/resulttoppmanga/resulttoppmanga.component';
import { ResultsearchComponent } from './Tool/resultsearch/resultsearch.component';
import { MangabycategoryComponent } from './manga/mangabycategory/mangabycategory.component';
import { HttpClientModule } from '@angular/common/http';
import { MangaService } from './Service/manga.service';
import { HomeComponent } from './home/home/home.component';
import { ForgotpasswordComponent } from './user/forgotpassword/forgotpassword.component';
import { UserpageComponent } from './user/userpage/userpage.component';
import { ToastrModule } from 'ngx-toastr';



export function MangaDefault(Mangas: MangaService) {
  return () => Mangas.GetMangaDefault(); // Gọi hàm initialize của service khi ứng dụng bắt đầu chạy
}
export function CategoriesDefault(Mangas: MangaService) {
  return () => Mangas.GetListCategories(); // Gọi hàm initialize của service khi ứng dụng bắt đầu chạy
}

export function GetPageNumber(Mangas: MangaService) {
  return () => Mangas.GetPageNumber(); // Gọi hàm initialize của service khi ứng dụng bắt đầu chạy
}
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
    AdsearchComponent,
    TopmangaComponent,
    LoginComponent,
    RegisterComponent,
    ListmangaComponent,
    ResulttoppmangaComponent,
    ResultsearchComponent,
    MangabycategoryComponent,
    HomeComponent,
    ForgotpasswordComponent,
    UserpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModulo,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      progressBar: true,
      progressAnimation: 'decreasing',
      timeOut: 3000,
      extendedTimeOut: 1000,
      disableTimeOut: false,
      tapToDismiss: true,
      closeButton: true,
    }),
  ],
  providers: [
    MangaService,
    {
      provide: APP_INITIALIZER,
      useFactory: MangaDefault,
      multi: true,
      deps: [MangaService]
    },
    {
      provide: APP_INITIALIZER,
      useFactory: CategoriesDefault,
      multi: true,
      deps: [MangaService]
    },
    {
      provide: APP_INITIALIZER,
      useFactory: GetPageNumber,
      multi: true,
      deps: [MangaService]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
