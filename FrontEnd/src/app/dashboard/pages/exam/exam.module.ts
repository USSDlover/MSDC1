import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamRoutingModule } from './exam-routing.module';
import {ExamComponent} from './exam.component';
import {QuestionFormComponent} from './components/question-form/question-form.component';
import {QuestionListComponent} from './components/question-list/question-list.component';
import {QuestionComponent} from './components/question-list/question/question.component';
import {IonicModule} from '@ionic/angular';
import {ExamFormComponent} from './components/exam-form/exam-form.component';
import {ExamListComponent} from './components/exam-list/exam-list.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    ExamComponent,
    ExamFormComponent,
    ExamListComponent,
    QuestionFormComponent,
    QuestionListComponent,
    QuestionComponent
  ],
    imports: [
        CommonModule,
        ExamRoutingModule,
        IonicModule,
        ReactiveFormsModule
    ]
})
export class ExamModule { }
