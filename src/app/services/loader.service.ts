import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loadingSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  loadingMap: Map<string, boolean> = new Map<string, boolean>();

  disabled: boolean = false;

  constructor() { }

  setLoading(loading: boolean, url: string): void {
    if(this.disabled){
      return;
    }
    if (!url) {
      throw new Error('The request URL must be provided to the LoadingService.setLoading function');
    }
    if (loading === true) {
      this.loadingMap.set(url, loading);
      this.loadingSub.next(true);
    }else if (loading === false && this.loadingMap.has(url)) {
      this.loadingMap.delete(url);
    }
    if (this.loadingMap.size === 0) {
      this.loadingSub.next(false);
    }
  }

  disableLoading() {
    this.disabled = true;
  }

  enableLoading() {
    this.disabled = false;
  }
}