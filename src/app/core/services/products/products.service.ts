import { Injectable } from '@angular/core';
import { Product } from '../../model/product.model';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) {

  }
  getAllProducts() {
    return this.http.get<Product[]>(`${environment.url_api}/products/`);
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${environment.url_api}/products/${id}`);
  }

  getServiciosPorFecha(fecha: Date) {
    return this.http.post(`${environment.url_ws}/wsObtenerServiciosPorFecha`, { Fecha: fecha });
  }

  createProduct(product: Product) {
    return this.http.post(`${environment.url_api}/products/`, product);
  }

  updateProduct(id: string, changes: Partial<Product>) {
    return this.http.put(`${environment.url_api}/products/${id}`, changes);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${environment.url_api}/products/${id}`);
  }
}
