import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {TopBarComponent} from './components/top-bar/top-bar.component';
import {LeftSideNavBarComponent} from './components/left-side-nav-bar/left-side-nav-bar.component';
import {ClientComponent} from './components/top-bar/inner-components/client/client.component';
import {UserProfileComponent} from './components/top-bar/inner-components/user-profile/user-profile.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


@NgModule({
  declarations: [
    DashboardComponent,
    TopBarComponent,
    LeftSideNavBarComponent,
    ClientComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    FontAwesomeModule
  ]
})
export class DashboardModule { }
