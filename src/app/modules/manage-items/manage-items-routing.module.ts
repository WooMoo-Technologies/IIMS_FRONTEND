import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ManageItemsComponent} from './manage-items.component';
import {AddNewItemComponent} from "./components/add-new-item/add-new-item.component";

const routes: Routes = [{ path: '', component: ManageItemsComponent, children: [
    {path: '', component: AddNewItemComponent},
    {path: 'add-item', component: AddNewItemComponent},
  ] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageItemsRoutingModule { }
