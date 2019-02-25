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
  color: string = "black";

  constructor(private _e: Events, private _ts: TasklistService) {
  	this.completedTasklistsToday = this._ts.getCompletedTasklistsToday();
  }

  ngOnInit() {
    this._e.subscribe('tasklists', ()=>{
      this.color = this._ts.getCurrentTasklist().gradients[0];
    });

    this._e.subscribe('swipe', ()=>{
      setTimeout(()=>{
        this.color = this._ts.getCurrentTasklist().gradients[0];
      }, 100);        
    });

  	this._e.subscribe('complete', ()=>{
  		this.completedTasklistsToday++;
  	});

    this._e.subscribe('completedTasklistsToday', ()=>{
      this.completedTasklistsToday = this._ts.getCompletedTasklistsToday();
    });
  }

}
