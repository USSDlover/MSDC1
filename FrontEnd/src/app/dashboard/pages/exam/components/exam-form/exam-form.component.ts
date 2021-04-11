import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ExamInterface} from '@data/interfaces';
import {ExamCreateDto, ExamUpdateDto} from '@data/dtos';

@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamFormComponent implements OnInit, OnChanges {
  public examForm: FormGroup;
  public editMode: boolean;

  @Input() exam: ExamInterface;
  @Output() createExam = new EventEmitter<ExamCreateDto>();
  @Output() updateExam = new EventEmitter<ExamUpdateDto>();

  constructor() {
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public ngOnChanges(changes: SimpleChanges) {
    console.log('Change detected');
    this.editMode = !!this.exam?._id;
    if (this.examForm && this.editMode) {
      this.fixValueOnChange();
    } else if (this.examForm && !this.editMode) {
      this.examForm.reset();
    }
  }

  public onFormSubmit(): void {
    if (this.editMode) {
      this.updateExam.emit({
        _id: this.exam._id,
        title: this.examForm.get('title').value,
        duration: this.examForm.get('duration').value,
        startDate: new Date(this.examForm.get('startDate').value).getTime(),
        expireAt: new Date(this.examForm.get('expireAt').value).getTime(),
        expired: this.exam.expired,
      });
    } else {
      this.createExam.emit({
        title: this.examForm.get('title').value,
        duration: this.examForm.get('duration').value,
        startDate: new Date(this.examForm.get('startDate').value).getTime(),
        expireAt: new Date(this.examForm.get('expireAt').value).getTime(),
        expired: false
      });
    }
  }

  private fixValueOnChange(): void {
    this.examForm.get('title').setValue(this.exam?.title ?? null);
    this.examForm.get('duration').setValue(this.exam?.duration ?? null);
    this.examForm.get('startDate').setValue(this.exam?.startDate ? new Date(this.exam.startDate) : null);
    this.examForm.get('expireAt').setValue(this.exam?.expireAt ? new Date(this.exam.expireAt) : null);
  }

  private initForm(): void {
    this.examForm = new FormGroup({
      title: new FormControl(this.exam?.title ?? null, Validators.required),
      duration: new FormControl(this.exam?.duration ?? null, Validators.required),
      startDate: new FormControl(this.exam?.startDate ?? null, Validators.required),
      expireAt: new FormControl(this.exam?.expireAt ?? null, Validators.required)
    });
  }

}
