import { Component, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';
import { TasklistService } from '../tasklist.service';

@Component({
  selector: 'app-ts-tracker',
  templateUrl: './ts-tracker.component.html',
  styleUrls: ['./ts-tracker.component.scss'],
})
export class TsTrackerComponent implements OnInit {

	completedTasklistsToday: number;

  constructor(private _e: Events, private _ts: TasklistService) {
  	this.completedTasklistsToday = this._ts.getCompletedTasklistsToday();
  }

  ngOnInit() {
  	this._e.subscribe('complete', ()=>{
  		this.completedTasklistsToday++;
  	});

    this._e.subscribe('completedTasklistsToday', ()=>{
      this.completedTasklistsToday = this._ts.getCompletedTasklistsToday();
    });
  }

}
