import {Component, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {faHome, faLaptopHouse, faUser} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-left-side-nav-bar',
  templateUrl: './left-side-nav-bar.component.html',
  styleUrls: ['./left-side-nav-bar.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('true', style({
      })),
      state('false', style({
        width: '0px',
      })),
      transition('true => false', animate('500ms')),
      transition('false => true', animate('500ms'))
    ])
  ]
})
export class LeftSideNavBarComponent implements OnInit {

  faHome= faHome;
  faLaptopHouse= faLaptopHouse;
  faUser= faUser;


  constructor() { }

  @Input() navState = true;
  title!: string;

  ngOnInit(): void {
  }

}
