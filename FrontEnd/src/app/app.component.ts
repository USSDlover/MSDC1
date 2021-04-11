import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Exam', url: '/folder/Exam', icon: 'book' },
    { title: 'Testers', url: '/folder/Testers', icon: 'id-card' },
  ];
  public otherPages = [
    { title: 'Settings', url: '/folder/Settings', icon: 'construct' },
    { title: 'Logout', url: '/folder/Logout', icon: 'exit' },
  ];
  constructor() {}
}
