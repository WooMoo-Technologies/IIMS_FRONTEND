import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedRoutingModule} from './shared-routing.module';
import {SharedComponent} from './shared.component';
import {AutoFocusDirective} from "./services/auto-focus.directive";
import {HighlightDirective} from "./services/highlight.directive";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    SharedComponent,
    HighlightDirective,
    AutoFocusDirective,
  ],
  exports: [
  HighlightDirective,
  AutoFocusDirective,
],
  imports: [
    CommonModule,
    SharedRoutingModule,
    HttpClientModule
  ]
})
export class SharedModule { }
