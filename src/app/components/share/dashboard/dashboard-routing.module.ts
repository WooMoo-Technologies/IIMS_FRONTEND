import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';

const routes: Routes = [{ path: '', component: DashboardComponent, children: [
    { path: '',   redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadChildren: () => import('../../../modules/home/home.module').then(m => m.HomeModule), data: { animation: 'isLeft'} },
    { path: 'manageItems', loadChildren: () => import('../../../modules/manage-items/manage-items.module').then(m => m.ManageItemsModule), data: { animation: 'isRight'} },
    { path: 'userProfile', loadChildren: () => import('../../../modules/user-profile/user-profile.module').then(m => m.UserProfileModule), data: { animation: 'isLeft'} },
  ] },
    { path: 'shared', loadChildren: () => import('../../../modules/shared/shared.module').then(m => m.SharedModule) },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
