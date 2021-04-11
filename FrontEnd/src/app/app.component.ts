import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Exam', url: 'dashboard/pages/Exam', icon: 'book' },
    { title: 'Testers', url: 'dashboard/pages/Testers', icon: 'id-card' },
  ];
  public otherPages = [
    { title: 'Settings', url: 'dashboard/pages/Settings', icon: 'construct' },
    { title: 'Logout', url: 'dashboard/pages/Logout', icon: 'exit' },
  ];
  constructor() {}
}
