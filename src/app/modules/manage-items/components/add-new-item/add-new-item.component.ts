import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ItemsService} from "../../services/items.service";
import {componentDTO} from "../../dto/componentDTO";
import {ApprovelDialogComponent} from "../../../../components/common/dialogs/approvel-dialog/approvel-dialog.component";
import {ApprovalDialogConfig} from "../../../../components/common/dialogs/approvel-dialog/model/ApprovalDialogConfig";
import {MatDialog} from "@angular/material/dialog";



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

  constructor(private http: HttpClient,
              private itemsservice : ItemsService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.itemDetailsForm = new FormGroup({
      componetName: new FormControl('', [
        Validators.required
      ]),
      componetDesc: new FormControl('', [
        Validators.required
      ]),
      imageURL: new FormControl('', [
        Validators.required
      ]),
      qty: new FormControl('', [
        Validators.required
      ]),
      unitPrice: new FormControl('', [
        Validators.required
      ]),
      componetCode  : new FormControl('', [
        Validators.required
      ]),
    });
  }

  saveItems() {
    this.itemsservice.saveComponents(new componentDTO(
      this.itemDetailsForm.get('componetName')?.value,
      this.itemDetailsForm.get('componetDesc')?.value,
      this.itemDetailsForm.get('imageURL')?.value,
      this.itemDetailsForm.get('qty')?.value,
      this.itemDetailsForm.get('unitPrice')?.value,
      this.itemDetailsForm.get('componetCode')?.value
    )).subscribe(res=>{
      console.log(res)
      if (res.responseCode==='200'){
        const addapproval = this.dialog.open(ApprovelDialogComponent, {
          width: '350px',
          data: new ApprovalDialogConfig('Alert', 'Successfully', 'Item Successfully Added')
        });
        addapproval.afterClosed().subscribe(approve => {
          if (approve) {
            console.log('Item Successfully Added');
          }
        });
      }else{
        const notapproval = this.dialog.open(ApprovelDialogComponent, {
          width: '350px',
          data: new ApprovalDialogConfig('Error', 'Unuccessful', 'Item Not Added')
        });
        notapproval.afterClosed().subscribe(approve => {
          if (approve) {
            console.log('Item Not Added');
          }
        });
      }
    });
  }
}
