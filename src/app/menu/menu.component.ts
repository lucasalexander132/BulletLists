import { Component, OnInit } from '@angular/core';
import { TasklistService, Tasklist } from '../tasklist.service';
import { NavController, Events } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

	tasklists: Array<Tasklist>;
	menuState: boolean = false;
	viewingConfirmation: boolean = false;

	constructor(private _ts: TasklistService, private _nc: NavController, private _e: Events) {

	}

	ngOnInit() {
		this._e.subscribe('tasklists', ()=>{
			this.tasklists = this._ts.getTasklists();
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

	confirm(){
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
