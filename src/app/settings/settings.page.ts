import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SettingsService } from '../settings.service';
import { NavController } from '@ionic/angular';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

	settingsChecked: boolean = false;
	darkMode: boolean = false;

	constructor(private _ss: SettingsService, private _events: Events, private _nc: NavController) {
		_ss.addSetting('darkMode', this.darkMode);
		_ss.addSetting('settingsChecked', this.settingsChecked);
	}

	ngOnInit() {
		if(this._ss.getSetting('settingsChecked')){
			this.settingsChecked = true;
			this.darkMode = this._ss.getSetting('darkMode');
		}

		this._events.subscribe('settings', ()=>{
			this.settingsChecked = true;
			this._ss.updateSetting('settingsChecked', this.settingsChecked);
			this.darkMode = this._ss.getSetting('darkMode');
		});
		this.darkMode = this._ss.getSetting('darkMode');
	}

	ngAfterViewInit(){
	}

	darkModeSwitched(){
		this.darkMode = !this.darkMode;
		this._ss.updateSetting('darkMode', this.darkMode);
	}

	back(){
		this._nc.navigateBack('/home');
	}

}
