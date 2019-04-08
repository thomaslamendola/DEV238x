import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Item {
  name: string;
  description: string;
  price: number;
  imagelink: string;
  rating: string;
  stock: string;
  category: string;
  subcategory: string;
}

export interface SubCategory {
  name: string;
  items: Item[]
}

export interface ProductCategory {
  category: string;
  subcategories: SubCategory[]
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  dataUrl: string = "https://webmppcapstone.blob.core.windows.net/data/itemsdata.json";

  getProducts(): Observable<ProductCategory[]> {
    return this.http.get<ProductCategory[]>(this.dataUrl);
  }
}
