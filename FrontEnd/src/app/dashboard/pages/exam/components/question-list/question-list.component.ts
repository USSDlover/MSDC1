import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {QuestionInterface} from '@data/interfaces';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionListComponent implements OnInit {
  @Input() questions: QuestionInterface[];

  constructor() { }

  ngOnInit() {}

}
