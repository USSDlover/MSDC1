import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

import {ExamInterface} from '@data/interfaces';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamListComponent implements OnInit {
  @Input() exams: ExamInterface[];

  constructor() { }

  ngOnInit() {}

}
