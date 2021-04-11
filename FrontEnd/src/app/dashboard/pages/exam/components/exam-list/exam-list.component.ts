import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {ExamInterface} from '@data/interfaces';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ExamListComponent implements OnInit {
  @Input() exams: ExamInterface[];
  @Output() examSelected = new EventEmitter<ExamInterface>();

  public selectedExamIndex: number;

  constructor() {
  }

  public ngOnInit() {
  }

  public onDefineNewExam(): void {
    this.selectedExamIndex = null;
    this.examSelected.emit(null);
  }

  public onSelectExam(exam: ExamInterface, index: number): void {
    this.selectedExamIndex = index;
    this.examSelected.emit(exam);
  }

}
