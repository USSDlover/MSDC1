import {Component, OnDestroy, OnInit} from '@angular/core';
import {ExamService} from '@data/services';
import {Subscription} from 'rxjs';

import {ExamInterface, QuestionInterface} from '@data/interfaces';
import {ModalController} from '@ionic/angular';
import {QuestionFormComponent} from './components/question-form/question-form.component';
import {ExamCreateDto, ExamUpdateDto, QuestionCreateDto, QuestionUpdateDto} from '@data/dtos';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss'],
})
export class ExamComponent implements OnInit, OnDestroy {
  public exams: ExamInterface[];
  public selectedExamQuestions: QuestionInterface[];
  public selectedExam: ExamInterface;
  private getExamSub: Subscription;

  constructor(
    public modal: ModalController,
    private service: ExamService
  ) {
  }

  public ngOnInit(): void {
    this.getExams();
  }

  public async onUpdateExam(updatedExam: ExamUpdateDto): Promise<void> {
    this.service
      .updateExam(updatedExam)
      .toPromise()
      .then(() => this.getExams())
      .catch(err => console.error(err))
      .finally();
  }

  public async onCreateExam(createdExam: ExamCreateDto): Promise<void> {
    this.service
      .createExam(createdExam)
      .toPromise()
      .then(res => {
        this.exams.push(res);
      })
      .catch(err => console.error(err))
      .finally();
  }

  public async onExamSelect(exam: ExamInterface): Promise<void> {
    if (!exam) {
      this.selectedExam = null;
      return;
    }
    this.service
      .getExamQuestions(exam._id)
      .toPromise()
      .then((res) => {
        console.log(res);
        this.selectedExam = exam;
        this.selectedExamQuestions = res;
      })
      .catch(err => console.error(err));
  }

  public async onNewQuestion(): Promise<void> {
    const modal = await this.modal.create({
      component: QuestionFormComponent,
    });
    await modal.present();
    modal.onDidDismiss<{question: QuestionCreateDto | QuestionUpdateDto}>()
      .then(res => {
        switch (res.role) {
          case 'create':
            res.data.question.exam = this.selectedExam._id;
            this.createQuestion((res.data.question as unknown) as QuestionCreateDto);
            break;
          case 'update':
            console.log('Update this');
            console.log(res.data);
            break;
          default:
            break;
        }
      });
  }

  private createQuestion(createdQuestion: QuestionCreateDto): void {
    console.log(createdQuestion);
    this.service
      .createQuestion(createdQuestion)
      .toPromise()
      .then(res => {
        this.selectedExamQuestions.push(res);
      })
      .catch(err => console.error(err))
      .finally();
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
