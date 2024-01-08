import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/home/header/header.component';
import { FooterComponent } from './component/home/footer/footer.component';
import { ContentComponent } from './component/home/content/content.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModulo } from './material.module';
import { HotkeymenuComponent } from './component/home/hotkeymenu/hotkeymenu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MangadetailComponent } from './component/manga/mangadetail/mangadetail.component';
import { ReadmangaComponent } from './component/manga/readmanga/readmanga.component';
import { NotfoundComponent } from './Service/servicecomponent/notfound/notfound.component';
import { SlidebarComponent } from './component/home/slidebar/slidebar.component';
import { ImageErrorDirective } from './Layout/image-error.directive';
import { AdsearchComponent } from './Tool/adsearch/adsearch.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TopmangaComponent } from './component/manga/topmanga/topmanga.component';
import * as loginComponent from './component/user/login/login.component';
import { RegisterComponent } from './component/user/register/register.component';
import { ListmangaComponent } from './component/manga/listmanga/listmanga.component';
import { ResulttoppmangaComponent } from './component/manga/resulttoppmanga/resulttoppmanga.component';
import { ResultsearchComponent } from './Tool/resultsearch/resultsearch.component';
import { MangabycategoryComponent } from './component/manga/mangabycategory/mangabycategory.component';
import { HttpClientModule } from '@angular/common/http';
import { MangaService } from './Service/manga.service';
import { HomeComponent } from './component/home/home/home.component';
import { ForgotpasswordComponent } from './component/user/forgotpassword/forgotpassword.component';
import { UserpageComponent } from './component/user/userpage/userpage.component';
import { ToastrModule } from 'ngx-toastr';
import { ResetpasswordComponent } from './component/user/resetpassword/resetpassword.component';
import { MangapageComponent } from './component/manga/mangapage/mangapage.component';
import { WebsiteServiceService} from './Service/website-service.service';
import { UserheaderComponent } from './component/user/userheader/userheader.component';
import { InfouserComponent } from './component/user/infouser/infouser.component';
import { PopupmessageComponent } from './Tool/popupmessage/popupmessage.component';
import { InfouserDetailsComponent } from './component/user/infouser-details/infouser-details.component';
import { InfouserReadhistoryComponent } from './component/user/infouser-readhistory/infouser-readhistory.component';
import { InfouserFollowingComponent } from './component/user/infouser-following/infouser-following.component';
import { CommentComponent } from './component/manga/comment/comment.component';
import { ReplycommentComponent } from './component/manga/replycomment/replycomment.component';
import { AvatarErrorService } from './Layout/avatar-error.service';
import { InfouserNotificationsComponent } from './component/user/infouser-notifications/infouser-notifications.component';
import { SearchComponent } from './Tool/search/search.component';
import { CommenttemplateComponent } from './Tool/commenttemplate/commenttemplate.component';
import { ChatpageComponent } from './component/chat/chatpage/chatpage.component';
import { ListroomchatComponent } from './component/chat/listroomchat/listroomchat.component';
import { ListuseractiveComponent } from './component/chat/listuseractive/listuseractive.component';
import { MainchatComponent } from './component/chat/mainchat/mainchat.component';
import { PopupMessageService, UsersInRoom } from './Service/repositores/injectable';
import { WebsocketService } from './Service/websocket.service';
import { RowInChatComponent } from './Tool/row-in-chat/row-in-chat.component';


export function IsLogin(webSite: WebsiteServiceService) {
  return () => webSite.Getcookie(); // Gọi hàm initialize của service khi ứng dụng bắt đầu chạy
}
export function websocket(injector: Injector) {
  return () => {
    const socket = injector.get(WebsocketService);
    return socket.startconection();
  };
}
export function MangaDefault(Mangas: MangaService) {
  return () => Mangas.GetMangaDefault(); // Gọi hàm initialize của service khi ứng dụng bắt đầu chạy
}
export function CategoriesDefault(Mangas: MangaService) {
  return () => Mangas.GetListCategories(); // Gọi hàm initialize của service khi ứng dụng bắt đầu chạy
}

export function GetPageNumber(Mangas: MangaService) {
  return () => Mangas.GetPageNumber(); // Gọi hàm initialize của service khi ứng dụng bắt đầu chạy
}

export function Topmanga(Manga: MangaService) {
  return () => Manga.GetTopMangaDefault(); // Gọi hàm initialize của service khi ứng dụng bắt đầu chạy
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
    loginComponent.LoginComponent,
    RegisterComponent,
    ListmangaComponent,
    ResulttoppmangaComponent,
    ResultsearchComponent,
    MangabycategoryComponent,
    HomeComponent,
    ForgotpasswordComponent,
    UserpageComponent,
    ResetpasswordComponent,
    MangapageComponent,
    UserheaderComponent,
    InfouserComponent,
    PopupmessageComponent,
    InfouserDetailsComponent,
    InfouserReadhistoryComponent,
    InfouserFollowingComponent,
    CommentComponent,
    ReplycommentComponent,
    AvatarErrorService,
    InfouserNotificationsComponent,
    SearchComponent,
    CommenttemplateComponent,
    ChatpageComponent,
    ListroomchatComponent,
    ListuseractiveComponent,
    MainchatComponent,
    RowInChatComponent
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
    WebsiteServiceService,
    WebsocketService,
    MangaService,
    PopupMessageService,
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
    {
      provide: APP_INITIALIZER,
      useFactory: IsLogin,
      multi: true,
      deps: [WebsiteServiceService]
    },
    {
      provide: APP_INITIALIZER,
      useFactory: Topmanga,
      multi: true,
      deps: [MangaService]
    },
    {
      provide: APP_INITIALIZER,
      useFactory: websocket,
      multi: true,
      deps: [Injector]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
