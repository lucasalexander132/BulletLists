import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

	menuState: boolean = false;

	constructor() { }

	ngOnInit() {}

	toggleMenu(){
		this.menuState = !this.menuState;
	}

}
