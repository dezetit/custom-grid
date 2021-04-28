import { Subject } from 'rxjs';
import { OnDestroy } from '@angular/core';

export class BasicComponent implements OnDestroy {
  public componentDestroyed$ = new Subject<void>();

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}
