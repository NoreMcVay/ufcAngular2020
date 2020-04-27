import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SafePipe } from './Pipes/Safe/safe.pipe';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FighterCardModalComponent } from './Modals/fighter-card-modal/fighter-card-modal.component';
import { AppRoutingModule } from './app-routing-module';
import { HomeComponent } from './home/home.component';
import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownFilterComponent } from './dropdown-filter/dropdown-filter.component';
import { FilterPipe } from './Pipes/Filter/filter.pipe';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ContactComponent } from './contact/contact.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { NavbarSearchResultService } from './Services/navbarSearchResultService.service';
import { FetchingDataService } from './Services/fetchingDataService.service';
import { GetFighterRankingService } from './Services/getFighterRankingService.service';
import { FighterRankingsComponent } from './fighter-rankings/fighter-rankings.component';
import { FighterRecordModalComponent } from './Modals/fighter-record-modal/fighter-record-modal.component';
import { PractiseComponent } from './practise/practise.component';
import { SearchService } from './Services/searchService.service';
import { NgxPaginationModule } from 'ngx-pagination';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { fakeBackendProvider } from './_helpers';


import { AlertComponent } from './_components';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { LogoutMessageModalComponent } from './Modals/logout-message-modal/logout-message-modal.component';
import { FighterDetailComponent } from './fighter-detail/fighter-detail.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SafePipe,
    FilterPipe,
    FighterRankingsComponent,
    ContactComponent,
    PractiseComponent,
    HomeComponent,
    JumbotronComponent,
    DropdownFilterComponent,
    FighterCardModalComponent,
    FighterRecordModalComponent,
    AlertComponent,
    LoginComponent,
    RegisterComponent,
    LogoutMessageModalComponent,
    FighterDetailComponent
  ],
  entryComponents: [
    FighterCardModalComponent,
    FighterRecordModalComponent,
    LogoutMessageModalComponent
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    NgbModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    FetchingDataService,
    SearchService,
    NavbarSearchResultService,
    GetFighterRankingService,
    NgbActiveModal,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
