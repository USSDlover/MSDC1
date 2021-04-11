import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {QuestionInterface} from '@data/interfaces';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionComponent implements OnInit {
  @Input() question: QuestionInterface;

  constructor() { }

  ngOnInit() {}

}
