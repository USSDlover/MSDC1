import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import {StudentComponent} from './student.component';
import {ListComponent} from './list/list.component';
import {ItemComponent} from './list/item/item.component';


@NgModule({
  declarations: [
    StudentComponent,
    ListComponent,
    ItemComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
