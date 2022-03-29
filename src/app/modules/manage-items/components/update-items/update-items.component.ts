import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ItemsService} from "../../services/items.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {updateDTO} from "../../dto/UpdateCompDTO";
import {ApprovelDialogComponent} from "../../../../components/common/dialogs/approvel-dialog/approvel-dialog.component";
import {ApprovalDialogConfig} from "../../../../components/common/dialogs/approvel-dialog/model/ApprovalDialogConfig";

@Component({
  selector: 'app-update-items',
  templateUrl: './update-items.component.html',
  styleUrls: ['./update-items.component.scss']
})
export class UpdateItemsComponent implements OnInit {

  idLoading = true;
  apiResponse!: false;
  UpdateItemsFrom!: FormGroup;
  checked = false;
  disabled = false;
  fileObj:any

  constructor(private http: HttpClient,
              private itemsservice : ItemsService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<UpdateItemsComponent>,) { }


  ngOnInit(): void {
    this.UpdateItemsFrom = new FormGroup({
      componetID: new FormControl('', [
        Validators.required,
      ]),
      componetName: new FormControl('', [
        Validators.required, Validators.pattern('^.{3,20}$')
      ]),
      componetDesc: new FormControl('', [
        Validators.required, Validators.pattern('^.{3,200}$')
      ]),
      imageURL: new FormControl('', [
        Validators.required
      ]),
      qty: new FormControl('', [
        Validators.required, Validators.pattern('^[0-9]{1,7}$')
      ]),
      unitPrice: new FormControl('', [
        Validators.required, Validators.pattern('^[0-9]{2,7}$')
      ]),
      componetCode  : new FormControl('', [
        Validators.required, Validators.pattern('^.{3,15}$')
      ]),
    });

    console.log(this.data);

    this.UpdateItemsFrom.setValue({
      componetID: this.data.componetID,
      componetName: this.data.componetName,
      componetDesc: this.data.componetDesc,
      imageURL: this.data.imageURL,
      qty: this.data.qty,
      unitPrice: this.data.unitPrice,
      componetCode: this.data.componetCode,
    });
  }

  uploadFile(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0].name;
    console.log(file)
    this.fileObj=((event.target as HTMLInputElement)?.files?.[0])

  };


  saveItemss() {
    this.itemsservice.updateComponents(new updateDTO(
      this.UpdateItemsFrom.get('componetID')?.value,
      this.UpdateItemsFrom.get('componetName')?.value,
      this.UpdateItemsFrom.get('componetDesc')?.value,
      this.UpdateItemsFrom.get('imageURL')?.value,
      this.UpdateItemsFrom.get('qty')?.value,
      this.UpdateItemsFrom.get('unitPrice')?.value,
      this.UpdateItemsFrom.get('componetCode')?.value
    ),this.fileObj).subscribe(res=>{
      console.log(res)
      if (res.responseCode==='200'){
        this.dialogRef.close();
          const approval5 = this.dialog.open(ApprovelDialogComponent, {
            width: '350px',
            data: new ApprovalDialogConfig('Alert', 'Successfully', 'Item '+this.data.componetName+' Is Updated')
          });
          approval5.afterClosed().subscribe(approve => {
            if (approve) {
              console.log('Item '+this.data.componetName+' Is Updated');
            }
          });
      }else{
      const approval4 = this.dialog.open(ApprovelDialogComponent, {
        width: '350px',
        data: new ApprovalDialogConfig('Error', 'UnSuccessful', 'Item '+this.data.componetName+' Is Not Updated')
      });
      approval4.afterClosed().subscribe(approve => {
        if (approve) {
          console.log('Item '+this.data.componetName+' Is Not Updated');
        }
      });
    }
    });
  }


  onNoClick(): void {
    this.dialogRef.close();
    const approval4 = this.dialog.open(ApprovelDialogComponent, {
      width: '350px',
      data: new ApprovalDialogConfig('Error', 'UnSuccessful', 'Item '+this.data.componetName+' Is Not Updated')
    });
    approval4.afterClosed().subscribe(approve => {
      if (approve) {
        console.log('Item '+this.data.componetName+' Is Not Updated');
      }
    });
  }

}
