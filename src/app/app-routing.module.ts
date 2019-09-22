import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { UserComponent } from './user/user.component';
import { ProviderlistComponent } from './provider/providerlist/providerlist.component';
import { ProviderdetailComponent } from './provider/providerdetail/providerdetail.component';
import { ProvidereditComponent } from './provider/provideredit/provideredit.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: UserComponent },
  // { path: 'employees/new', component: EmployeecreateComponent},
  { path: 'provider/:id', component: ProviderdetailComponent},
  { path: 'provider/:id/edit', component: ProvidereditComponent},
  { path: 'provider',   component: ProviderlistComponent,
    children: [
      { path: ':id', component: ProviderdetailComponent},
    ]},
  { path: '**',   component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ProviderlistComponent,
                                  ProviderdetailComponent,
                                  ProvidereditComponent,
                                  UserComponent,
                                  HomeComponent,
                                  PagenotfoundComponent];
