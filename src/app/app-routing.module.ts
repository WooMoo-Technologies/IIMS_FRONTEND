import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/share/login/login.component";
import {NotFoundPageComponent} from "./components/common/not-found-page/not-found-page.component";
import {AuthGuard} from "./guard/auth.guard";

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  { path: 'dashboard',
    loadChildren: () => import('./components/share/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]  },
  {path: '**', component: NotFoundPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
