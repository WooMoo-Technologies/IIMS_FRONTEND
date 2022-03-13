import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }
  navSate = true;

  ngOnInit(): void {
  }

  reciveNavState($event: boolean): void{
    this.navSate = $event;
    console.log(this.navSate);
  }

}
