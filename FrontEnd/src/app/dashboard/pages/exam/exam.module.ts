import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamRoutingModule } from './exam-routing.module';
import {ExamComponent} from './exam.component';
import {QuestionFormComponent} from './components/question-form/question-form.component';
import {QuestionListComponent} from './components/question-list/question-list.component';
import {QuestionComponent} from './components/question-list/question/question.component';


@NgModule({
  declarations: [
    ExamComponent,
    QuestionFormComponent,
    QuestionListComponent,
    QuestionComponent
  ],
  imports: [
    CommonModule,
    ExamRoutingModule
  ]
})
export class ExamModule { }
