import {Component, OnInit, ViewChild} from '@angular/core';
import {Filter} from "../../../../components/common/models/Filter";
import {componentDTO} from "../../../manage-items/dto/componentDTO";
import {MatTableDataSource} from "@angular/material/table";
import {debounceTime, distinctUntilChanged, Subject, Subscription, timeout} from "rxjs";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ItemsService} from "../../../manage-items/services/items.service";
import {SystemConfig} from "../../../../util/SystemConfig";

@Component({
  selector: 'app-all-itms',
  templateUrl: './all-itms.component.html',
  styleUrls: ['./all-itms.component.scss']
})
export class AllItmsComponent implements OnInit {

  filters: Filter[] = [{key: 'ALL', value: 'All'}, {key: 'NAME', value: 'Name'}, {key: 'DESC', value: 'Desc'}, {key: 'URL', value: 'Url'}, {
    key: 'QTY', value: 'qty'},{key: 'PRICE', value: 'Price'},{key: 'CODE', value: 'Code'}];
  components!: Array<componentDTO>[];
  displayedColumns: string[] = ['componetName', 'componetDesc', 'imageURL', 'qty', 'unitPrice', 'componetCode'];
  dataSource: MatTableDataSource<Array<componentDTO>>;
  private allComponentsSub2!: Subscription;
  private searchComponentsSub2!: Subscription;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tempPageEvent!: PageEvent;
  filterDetailsForm!: FormGroup;
  search = new Subject();
  searchedWords!: string[];
  pageSizeOptions!: number[];
  pageCount = 0;

  constructor(public dialog: MatDialog,
              private itemsservice2:ItemsService) {
    this.dataSource = new MatTableDataSource(this.components);
    this.pageSizeOptions = SystemConfig.getPageSizes();
  }

  ngOnInit(): void {
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

  refreshTable(): void {
    const searchKeyWord = this.filterDetailsForm.get('searchKeyWord')?.value;
    this.loadTable2(String(this.paginator.pageIndex), String(this.paginator.pageSize));
    this.searchTable2(searchKeyWord)
  }

  public loadTable2(pageIndex: string, pageSize: string): void {
    this.allComponentsSub2 = this.itemsservice2.getAllComponents(pageIndex, pageSize)
      .subscribe(result => {
        console.log(result.content)
        this.paginator.length = result.content.length;
        this.dataSource = result.content;
        this.refreshPageCount();
      }, error => {
        console.log(error);
      });
  }

  searchTable2(searchKeyWord: string): void {
    if (searchKeyWord!=='') {
      this.searchComponentsSub2 = this.itemsservice2.searchComponent(searchKeyWord)
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

  public getServerData(event: PageEvent): any {
    const searchKeyWord = this.filterDetailsForm.get('searchKeyWord')?.value;
    this.loadTable2(String(event.pageIndex), String(event.pageSize));
    this.searchTable2(searchKeyWord)
  }

}
