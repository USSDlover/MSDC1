import {Component, OnDestroy, OnInit} from '@angular/core';
import {ExamService} from '@data/services';
import {Subscription} from 'rxjs';

import {ExamInterface} from '@data/interfaces';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss'],
})
export class ExamComponent implements OnInit, OnDestroy {
  public exams: ExamInterface[];
  private getExamSub: Subscription;

  constructor(private service: ExamService) { }

  public ngOnInit(): void {
    this.getExams();
  }

  private getExams(): void {
    this.getExamSub = this.service.getAll()
      .subscribe({
        next: (res) => this.exams = res,
        error: err => console.error(err),
        complete: () => {}
      });
  }

  public ngOnDestroy(): void {
    if (this.getExamSub) {
      this.getExamSub.unsubscribe();
    }
  }

}
