import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GridService {
  private uniqueIDs = new BehaviorSubject(null);
  private pageIndex = new Subject();
  currentUniqueIDs$ = this.uniqueIDs.asObservable();
  changedPageIndex$ = this.pageIndex.asObservable();

  changeUniqueIDs(uniqueIDs: number[]) {
    this.uniqueIDs.next(uniqueIDs);
  }

  reducePageIndex(reset = false) {
    this.pageIndex.next(reset);
  }
}
