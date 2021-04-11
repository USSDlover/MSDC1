import { Component, OnInit } from '@angular/core';
import {MenuController} from '@ionic/angular';

@Component({
  selector: 'app-become-guardian',
  templateUrl: './become-guardian.component.html',
  styleUrls: ['./become-guardian.component.scss'],
})
export class BecomeGuardianComponent implements OnInit {

  constructor(private menu: MenuController) {
    menu.enable(false, 'dash-menu').finally();
  }

  ngOnInit() {}

}
