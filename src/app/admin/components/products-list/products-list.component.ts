import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ProductsService } from './../../../core/services/products/products.service';
import { Product } from './../../../core/model/product.model';
import { ProductListDataSource } from './product-list-datasource';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<Product>;
  dataSource: ProductListDataSource;
  // products: Product[] = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns: string[] = ['id', 'title', 'price', 'actions'];
  fecha: Date;


  constructor(
    private productService: ProductsService
  ) { }

  ngOnInit() {
    this.dataSource = new ProductListDataSource(this.productService);
    this.fetchProducts();
  }

  fetchProducts() {
    console.log('estoy en fetchProducts');
    this.productService.getAllProducts()
      .subscribe(products => {
        console.log('1');
        this.dataSource.data = products;
        console.log('2');
      });

    console.log('3');
  }

  fetchServiciosPorFecha(fecha) {
    this.productService.getServiciosPorFecha(fecha)
      .subscribe(res => {
        console.log('Me devuele algo desde angular');
        console.log(res);
      });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.fetchProducts();
    this.table.dataSource = this.dataSource;
  }
  /*
  deleteProduct(id: string) {
    this.productService.deleteProduct(id)
      .subscribe(res => {
        console.log(`OK!!!!! ----  Respuesta: ${res}`);
        if (res) {
          const index = this.products.findIndex(product => product.id === id);
          this.products.splice(index, 1);
          this.products = [...this.products];
        }
        this.fetchProducts();
      });

  }
  */
}
