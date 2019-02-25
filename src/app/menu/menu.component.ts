import { Component, OnInit } from '@angular/core';
import { TasklistService, Tasklist } from '../tasklist.service';
import { SettingsService } from '../settings.service';
import { NavController, Events } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

	tasklists: Array<Tasklist> = [];
	menuState: boolean = false;
	viewingConfirmation: boolean = false;
	color: string = "black";
	darkMode: boolean = false;

	constructor(private _ts: TasklistService, private _nc: NavController, private _e: Events, private _ss: SettingsService) {

	}

	ngOnInit() {
		this._e.subscribe('tasklists', ()=>{
			this.tasklists = this._ts.getTasklists();
      		this.color = this._ts.getCurrentTasklist().gradients[1];
		});

		this._e.subscribe('swipe', ()=>{
			setTimeout(()=>{
				this.color = this._ts.getCurrentTasklist().gradients[0];
			}, 10);	      
	    });

	    this._e.subscribe('settings', ()=>{
	    	this.darkMode = this._ss.getSetting('darkMode');
	    });

	    this._e.subscribe('updateSettings', ()=>{
	    	this.darkMode = this._ss.getSetting('darkMode');
	    });
	}

	toggleMenu(){
		this.menuState = !this.menuState;
	}

	newTasklist(){
		this.toggleMenu();
		this._nc.navigateForward('/new');
	}

	editTasklist(){
		this.toggleMenu();
		this._nc.navigateForward('/edit');
	}

	donate(){
		this.toggleMenu();
		this._nc.navigateForward('/donation');
	}

	settings(){
		this.toggleMenu();
		this._nc.navigateForward('/settings');
	}

	confirmDelete(){
		this.viewingConfirmation = true;
	}

	cancelDelete(){
		this.viewingConfirmation = false;
	}

	delete(){
		this._ts.deleteCurrentList();
		this.cancelDelete();
		this.toggleMenu();
	}

}
