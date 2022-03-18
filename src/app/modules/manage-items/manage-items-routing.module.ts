import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ManageItemsComponent} from './manage-items.component';
import {AddNewItemComponent} from "./components/add-new-item/add-new-item.component";
import {AllItemsComponent} from "./components/all-items/all-items.component";
import {UpdateItemsComponent} from "./components/update-items/update-items.component";

const routes: Routes = [{ path: '', component: ManageItemsComponent, children: [
    {path: '', component: AddNewItemComponent},
    {path: 'additem', component: AddNewItemComponent},
    {path: 'allitem', component: AllItemsComponent},
    {path: 'updateitem', component: UpdateItemsComponent},
  ] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageItemsRoutingModule { }
