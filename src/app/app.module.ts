import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProviderComponent } from './provider/provider.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ProviderlistComponent } from './provider/providerlist/providerlist.component';
import { ProviderdetailComponent } from './provider/providerdetail/providerdetail.component';
import { ProvidereditComponent } from './provider/provideredit/provideredit.component';
import {AppRoutingModule} from './app-routing.module';
import { UserComponent } from './user/user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserService} from './user.service';
import {ProviderService} from './provider.service';
import {StorageService} from './storage.service';
import { ProvidercreateComponent } from './provider/providercreate/providercreate.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    ProviderComponent,
    HomeComponent,
    PagenotfoundComponent,
    ProviderlistComponent,
    ProviderdetailComponent,
    ProvidereditComponent,
    UserComponent,
    ProvidercreateComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    UserService,
    ProviderService,
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
