import {Component, OnDestroy, OnInit} from '@angular/core';
import {ExamService} from '@data/services';
import {Subscription} from 'rxjs';

import {ExamInterface, QuestionInterface} from '@data/interfaces';
import {ModalController} from '@ionic/angular';
import {QuestionFormComponent} from './components/question-form/question-form.component';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss'],
})
export class ExamComponent implements OnInit, OnDestroy {
  public exams: ExamInterface[];
  public selectedExamQuestions: QuestionInterface[];
  private getExamSub: Subscription;

  constructor(
    public modal: ModalController,
    private service: ExamService
  ) {
  }

  public ngOnInit(): void {
    this.getExams();
  }

  public async onExamSelect(examId: string): Promise<void> {
    this.service
      .getExamQuestions(examId)
      .toPromise()
      .then((res) => {
        console.log(res);
        this.selectedExamQuestions = res;
      })
      .catch(err => console.error(err));
  }

  public async onNewQuestion() {
    const modal = await this.modal.create({
      component: QuestionFormComponent,
    });
    return await modal.present();
  }

  private getExams(): void {
    this.getExamSub = this.service.getAll()
      .subscribe({
        next: (res) => this.exams = res,
        error: err => console.error(err),
        complete: () => {
        }
      });
  }

  public ngOnDestroy(): void {
    if (this.getExamSub) {
      this.getExamSub.unsubscribe();
    }
  }

}
