import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {QuestionInterface} from '@data/interfaces';
import {QuestionCreateDto, QuestionUpdateDto} from '@data/dtos';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss'],
})
export class QuestionFormComponent implements OnInit {
  public editMode: boolean;
  public questionForm: FormGroup;

  @Input() question: QuestionInterface;

  constructor(public modal: ModalController) { }

  public ngOnInit(): void {
    this.editMode = !!this.question;
    this.initForm();
  }

  public async onSubmit(): Promise<void> {
    const exam: Partial<QuestionInterface> = {
      title: this.questionForm.get('title').value,
      answers: {
        1: this.questionForm.get('one').value,
        2: this.questionForm.get('two').value,
        3: this.questionForm.get('three').value,
        4: this.questionForm.get('four').value
      },
      correct: this.questionForm.get('correct').value
    };

    if (this.editMode) {
      exam._id = this.question._id;
      exam.exam = this.question.exam;
    }

    await this.modal.dismiss({
      question: exam
    }, this.editMode ? 'update' : 'create');
  }

  public async onDismiss(): Promise<void> {
    await this.modal.dismiss({}, 'dismiss');
  }

  private initForm(): void {
    this.questionForm = new FormGroup({
      title: new FormControl(this.question?.title ?? null, Validators.required),
      one: new FormControl(this.question?.answers['1'] ?? null, Validators.required),
      two: new FormControl(this.question?.answers['2'] ?? null, Validators.required),
      three: new FormControl(this.question?.answers['3'] ?? null),
      four: new FormControl(this.question?.answers['4'] ?? null),
      correct: new FormControl(this.question?.correct ?? null, Validators.required)
    });
  }

}
