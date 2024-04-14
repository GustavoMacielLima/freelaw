import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LitigationFormModalComponent } from './components/litigation-form-modal/litigation-form-modal.component';
import { LitigationModel, LitigationService } from '../../../shared/service/litigation/litigation.service';
import { PageEvent } from '@angular/material/paginator';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'freelaw-litigation',
  templateUrl: './litigation.component.html',
  styleUrl: './litigation.component.scss'
})
export class LitigationComponent {
  /* litigationNumber
partName
partSocialNumber
lawer */
  public litigations: Array<LitigationModel> = new Array<LitigationModel>();
  public displayedColumns: Array<string> = ['litigationNumber', 'partName', 'partSocialNumber', 'lawer', 'tools'];
  public length: number = 10;
  public pageSize: number = 10;
  public pageIndex: number = 0;
  public pageSizeOptions: Array<number> = [5, 10, 25];
  public pageEvent: PageEvent = new PageEvent();
  public searchText: string = '';
  public searchTextChange: Subject<string> = new Subject<string>();
  public searchControl: Subscription = new Subscription();

  constructor(public dialog: MatDialog, private litigationService: LitigationService){
    this.getLitigations();
  }

  search(ev: unknown): void {
    const newSearch: string = typeof ev === 'string' ? ev.toString() : '';
    this.searchTextChange.next(newSearch);
    this.searchControl = this.searchTextChange.pipe(debounceTime(1000)).subscribe((searchValue: string) => {
      this.searchText = searchValue;
      this.getLitigations();
    });
  }
  
  private getLitigations(){
    this.getLitigationsRowsLength();
    this.litigations = this.litigationService.get(this.pageIndex + 1, this.pageSize, this.searchText);
  }

  private getLitigationsRowsLength(): void {
    this.length = this.litigationService.getPagination(this.searchText);
  }

  public openLitigationModal(litigation?: LitigationModel): void{
    const createDialog = this.dialog.open(LitigationFormModalComponent, {
      data: litigation
    });

    createDialog.afterClosed().subscribe(data => {
      if(!data) return;
      this.getLitigations();
    });
  }


  public delete(litigation: LitigationModel): void{
    const deleteConfirm: boolean = confirm('Deseja excluir esse registro?');
    if (!deleteConfirm) return;
    this.litigationService.delete(litigation);
    this.getLitigations();
  }

  public handlePageEvent(e: PageEvent): void {
    this.pageEvent = e;
    this.length = e.length;
    this.pageIndex = e.pageSize !== this.pageSize ? 0 : e.pageIndex;
    this.pageSize = e.pageSize;
    this.getLitigations();
  }
}
