import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { ProductCategory } from './core/models/product-category';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataSubject = new ReplaySubject<ProductCategory[]>(1);
  data$: Observable<ProductCategory[]> = this.dataSubject.asObservable();

  constructor(private http: HttpClient) { }

  dataUrl: string = "https://webmppcapstone.blob.core.windows.net/data/itemsdata.json";

  initialise() {
    this._fetch();
  }

  getProducts(): Observable<ProductCategory[]> {
    return this.data$;
  }

  private _fetch() {
    this.http.get(this.dataUrl).subscribe((response: ProductCategory[]) => this.dataSubject.next(response));
  }
}
