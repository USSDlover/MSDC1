import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss'],
})
export class QuestionFormComponent implements OnInit {
  public editMode: boolean;

  constructor(public modal: ModalController) { }

  public ngOnInit(): void {}

  public async onSubmit(): Promise<void> {
    await this.modal.dismiss({
      question: 'New question'
    }, this.editMode ? 'update' : 'create');
  }

  public async onDismiss(): Promise<void> {
    await this.modal.dismiss({}, 'dismiss');
  }

}
