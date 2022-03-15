import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ManageItemsRoutingModule} from './manage-items-routing.module';
import {ManageItemsComponent} from './manage-items.component';
import {AddNewItemComponent} from './components/add-new-item/add-new-item.component';
import {AllItemsComponent} from './components/all-items/all-items.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatRadioModule} from "@angular/material/radio";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatTableModule} from "@angular/material/table";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatPaginatorModule} from "@angular/material/paginator";
import {SharedModule} from "../shared/shared.module";
import {HttpClientModule} from "@angular/common/http";
import {UpdateItemsComponent} from './components/update-items/update-items.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSortModule} from "@angular/material/sort";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MaterialFileInputModule} from "ngx-material-file-input";


@NgModule({
    declarations: [
        ManageItemsComponent,
        AddNewItemComponent,
        AllItemsComponent,
        UpdateItemsComponent
    ],
    exports: [
        AllItemsComponent
    ],
    imports: [
        CommonModule,
        ManageItemsRoutingModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatRadioModule,
        MatButtonModule,
        MatSelectModule,
        MatTableModule,
        MatToolbarModule,
        MatPaginatorModule,
        SharedModule,
        HttpClientModule,
        MatDialogModule,
        MatSortModule,
        MatCheckboxModule,
        MaterialFileInputModule
    ]
})
export class ManageItemsModule { }
