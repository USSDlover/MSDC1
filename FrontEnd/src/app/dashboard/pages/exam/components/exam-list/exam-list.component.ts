import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {ExamInterface} from '@data/interfaces';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamListComponent implements OnInit {
  @Input() exams: ExamInterface[];
  @Output() examSelected = new EventEmitter<string>();

  public selectedExamIndex: number;

  constructor() {
  }

  public ngOnInit() {
  }

  public onSelectExam(id: string, index: number): void {
    this.selectedExamIndex = index;
    this.examSelected.emit(id);
  }

}
