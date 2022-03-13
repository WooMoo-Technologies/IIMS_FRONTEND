import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {HomeService} from "../../services/home.service";

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {
  startForm!: FormGroup;
  percent=0;

  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

  constructor(private homeservice:HomeService) { }

  ngOnInit(): void {
    this.startForm = new FormGroup({
    })
    this.loadItems()
  }

  loadItems() {
    this.homeservice.getTotalCount().subscribe(res=>{
        this.percent = res.content.NofComps
      },error => {
        console.log(error)
      });
  }
}
