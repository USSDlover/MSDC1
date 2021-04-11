import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Exam', url: 'dashboard/pages/exam', icon: 'book' },
    { title: 'Students', url: 'dashboard/pages/student', icon: 'id-card' },
  ];
  public otherPages = [
    { title: 'Settings', url: 'dashboard/pages/settings', icon: 'construct' },
    { title: 'Logout', url: 'auth', icon: 'exit' },
  ];
  constructor() {}
}
