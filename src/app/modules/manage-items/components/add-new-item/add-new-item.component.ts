import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ItemsService} from "../../services/items.service";
import {componentDTO} from "../../dto/componentDTO";
import {ApprovelDialogComponent} from "../../../../components/common/dialogs/approvel-dialog/approvel-dialog.component";
import {ApprovalDialogConfig} from "../../../../components/common/dialogs/approvel-dialog/model/ApprovalDialogConfig";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {debounceTime, distinctUntilChanged, Observable, Subject, Subscription, timeout} from "rxjs";
import {Filter} from "../../../../components/common/models/Filter";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {SystemConfig} from "../../../../util/SystemConfig";
import {UpdateItemsComponent} from "../update-items/update-items.component";



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
              public dialog: MatDialog,
              ) {
    this.dataSource = new MatTableDataSource(this.components);
    this.pageSizeOptions = SystemConfig.getPageSizes();
  }



  ngOnInit(): void {
    this.itemDetailsForm = new FormGroup({
      componetName: new FormControl('', [
        Validators.required, Validators.minLength(3)
      ]),
      componetDesc: new FormControl('', [
        Validators.required, Validators.minLength(3)
      ]),
      imageURL: new FormControl('', [
        Validators.required
      ]),
      qty: new FormControl('', [
        Validators.required, Validators.minLength(1), Validators.pattern('[0-9]')
      ]),
      unitPrice: new FormControl('', [
        Validators.required, Validators.minLength(1), Validators.pattern('[0-9]')
      ]),
      componetCode: new FormControl('', [
        Validators.required, Validators.minLength(3)
      ]),
    });

    this.filterDetailsForm = new FormGroup({
      searchKeyWord: new FormControl('', [
        Validators.required
      ]),
      filter:new FormControl('ALL'),
      stateFilter:new FormControl('ACTIVATED')
    });
    this.search.pipe(
      debounceTime(SystemConfig.getDebounceTime()),
      distinctUntilChanged())
      .subscribe(() => {
        this.searchedWords = this.filterDetailsForm.get('searchKeyWord')?.value.trim().split(' ');
        this.refreshTable();

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
      this.itemDetailsForm.get('imageURL')?.value,
      this.itemDetailsForm.get('qty')?.value,
      this.itemDetailsForm.get('unitPrice')?.value,
      this.itemDetailsForm.get('componetCode')?.value
    ),this.fileObj).subscribe(res=>{
      console.log(res)
      if (res.responseCode==='200'){
        console.log("sucess")
        const approval5 = this.dialog.open(ApprovelDialogComponent, {
          width: '350px',
          data: new ApprovalDialogConfig('Alert', 'Successfully', 'Item Added Successfully')
        });
        approval5.afterClosed().subscribe(approve => {
          if (approve) {
            console.log('Item Added Successfully');
            this.itemDetailsForm.reset();
            this.refreshTable();
          }
        });
      }else{
        console.log("Nop")
        const approval4 = this.dialog.open(ApprovelDialogComponent, {
          width: '350px',
          data: new ApprovalDialogConfig('Error', 'UnSuccessful', 'Item Add Unsuccessful')
        });
        approval4.afterClosed().subscribe(approve => {
          if (approve) {
            console.log('Item Add Unsuccessful');
          }
        });
      }
    });

  }

  // ==========================================================================================================

  filters: Filter[] = [{key: 'ALL', value: 'All'}, {key: 'NAME', value: 'Name'}, {key: 'DESC', value: 'Desc'}, {key: 'URL', value: 'Url'}, {
    key: 'QTY', value: 'qty'},{key: 'PRICE', value: 'Price'},{key: 'CODE', value: 'Code'}];
  components!: Array<componentDTO>[];
  displayedColumns: string[] = ['componetName', 'componetDesc', 'imageURL', 'qty', 'unitPrice', 'componetCode', 'action'];
  dataSource: MatTableDataSource<Array<componentDTO>>;
  private allComponentsSub!: Subscription;
  private searchComponentsSub!: Subscription;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tempPageEvent!: PageEvent;
  filterDetailsForm!: FormGroup;
  search = new Subject();
  searchedWords!: string[];
  pageSizeOptions!: number[];
  pageCount = 0;


  ngAfterViewInit(): void {
    this.refreshTable();
  }

  public refreshPageCount(): void {
    if (this.paginator){
      console.log('refresh page count');
      this.pageCount = Math.ceil(this.paginator.length / this.paginator.pageSize);
      console.log('refresh page count after');
    }
  }

  pageNavigate(value: string): void {
    this.paginator.pageIndex = Number(value) - 1;
    this.paginator.page.next({
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      length: this.paginator.length
    });
  }

  Test($event: KeyboardEvent): void {
    console.log($event);
  }

  public refreshTable(): void {
    const searchKeyWord = this.filterDetailsForm.get('searchKeyWord')?.value;
    this.loadTable(String(this.paginator.pageIndex), String(this.paginator.pageSize));
    this.searchTable(searchKeyWord)
  }


  public loadTable(pageIndex: string, pageSize: string): void {
    this.allComponentsSub = this.itemsservice.getAllComponents(pageIndex, pageSize)
      // .pipe(timeout(4000))
      .subscribe(result => {
        console.log(result.content)
        this.paginator.length = result.content.length;
        this.dataSource = result.content;
        this.refreshPageCount();
      }, error => {
        console.log(error);
      });
  }

  searchTable(searchKeyWord: string): void {
    if (searchKeyWord!==''){
    this.searchComponentsSub = this.itemsservice.searchComponent(searchKeyWord)
      .pipe(timeout(4000))
      .subscribe(result => {
        console.log(result.content)
        this.paginator.length = result.content.length;
        this.dataSource = result.content;
        this.refreshPageCount();
      }, error => {
        console.log(error);
      });
    }else {
      console.log("not search")
    }
  }



  updateCustomer(row: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.width = '55%';
    dialogConfig.height = '80%';
    console.log(row);
    console.log('----------------------------');
    const dialogRef = this.dialog.open(UpdateItemsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log("response code1")
      console.log(result)
      console.log("response code2")
      this.refreshTable();
    });
  }

  deleteCustomer(row: any): void {
    const approval = this.dialog.open(ApprovelDialogComponent, {
      width: '350px',
      data: new ApprovalDialogConfig('Delete', 'Warning !', 'Are you sure you want to delete '+row.componetName+' Item?')
    });
    approval.afterClosed().subscribe(approve => {
      if (approve) {
        console.log(approve)
        this.itemsservice.deleteComponent(row.componetID).subscribe(res => {
          console.log(res);
          this.refreshTable();
        });

      }else{
        const approval4 = this.dialog.open(ApprovelDialogComponent, {
          width: '350px',
          data: new ApprovalDialogConfig('Error', 'UnSuccessful', 'Item '+row.componetName+' Is Not Deleted')
        });
        approval4.afterClosed().subscribe(approve => {
          if (approve) {
            this.refreshTable();

          }
        })
      }
    });
  }




  public getServerData(event: PageEvent): any {
    const searchKeyWord = this.filterDetailsForm.get('searchKeyWord')?.value;
    this.loadTable(String(event.pageIndex), String(event.pageSize));
    this.searchTable(searchKeyWord)
  }



}
