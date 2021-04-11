import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MenuController} from '@ionic/angular';

@Component({
  selector: 'app-folder',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  public folder: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private menu: MenuController
  ) {
    menu.enable(true, 'dash-menu').finally();
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
