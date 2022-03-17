import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ItemsService} from "../../services/items.service";
import {componentDTO} from "../../dto/componentDTO";
import {ApprovelDialogComponent} from "../../../../components/common/dialogs/approvel-dialog/approvel-dialog.component";
import {ApprovalDialogConfig} from "../../../../components/common/dialogs/approvel-dialog/model/ApprovalDialogConfig";
import {MatDialog} from "@angular/material/dialog";
import {Observable} from "rxjs";


@Component({
  selector: 'app-add-new-item',
  templateUrl: './add-new-item.component.html',
  styleUrls: ['./add-new-item.component.scss']
})
export class AddNewItemComponent implements OnInit {


  idLoading = true;
  city: any;
  apiResponse!: false;
  itemDetailsForm!: FormGroup;
  brand: any;
  selectedFiles?: FileList;
  fileInfos?: Observable<any>;
  fileObj:any
  constructor(private http: HttpClient,
              private itemsservice: ItemsService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.itemDetailsForm = new FormGroup({
      componetName: new FormControl('', [
        Validators.required
      ]),
      componetDesc: new FormControl('', [
        Validators.required
      ]),
      componetimage: new FormControl('', [
        Validators.required
      ]),
      qty: new FormControl('', [
        Validators.required
      ]),
      unitPrice: new FormControl('', [
        Validators.required
      ]),
      componetCode: new FormControl('', [
        Validators.required
      ]),
    });
  }

  uploadFile(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0].name;
    console.log(file)
    this.fileObj=((event.target as HTMLInputElement)?.files?.[0])

  };

  saveItems() {
    this.itemsservice.addUser(new componentDTO(
      this.itemDetailsForm.get('componetName')?.value,
      this.itemDetailsForm.get('componetDesc')?.value,
      this.itemDetailsForm.get('componetimage')?.value,
      this.itemDetailsForm.get('qty')?.value,
      this.itemDetailsForm.get('unitPrice')?.value,
      this.itemDetailsForm.get('componetCode')?.value
    ),this.fileObj).subscribe(res=>{
      console.log(res)
      if (res.responseCode==='200'){
        console.log("sucess")
      }else{
        console.log("Nop")
      }
    });

  }



}
