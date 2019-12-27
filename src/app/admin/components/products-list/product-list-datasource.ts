import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

import { Product } from './../../../core/model/product.model';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { OnInit, AfterViewInit } from '@angular/core';

const EXAMPLE_DATA: Product[] = [
    { id: '1', image: 'assets/images/camiseta.png', title: 'Camiseta', price: 80000, description: 'bla bla bla bla bla' },
    { id: '2', image: 'assets/images/hoodie.png', title: 'Hoodie', price: 80000, description: 'bla bla bla bla bla' }
];

/**
 * Data source for the OrdenList view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ProductListDataSource extends DataSource<Product> implements OnInit, AfterViewInit {
    data: Product[] = fetch_Products(this.productService);
    paginator: MatPaginator;
    sort: MatSort;

    constructor(
        private productService: ProductsService
    ) {
        super();
    }

    ngOnInit() {
        this.fetchProducts(this.productService);
    }

    ngAfterViewInit() {
        this.fetchProducts(this.productService);
    }

    /**
     * Connect this data source to the table. The table will only update when
     * the returned stream emits new items.
     * @returns A stream of the items to be rendered.
     */
    connect(): Observable<Product[]> {
        // Combine everything that affects the rendered data into one update
        // stream for the data-table to consume.
        const dataMutations = [
            observableOf(this.data),
            this.paginator.page,
            this.sort.sortChange
        ];

        return merge(...dataMutations).pipe(map(() => {
            return this.getPagedData(this.getSortedData([...this.data]));
        }));
    }

    disconnect() { }

    private getPagedData(data: Product[]) {
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        return data.splice(startIndex, this.paginator.pageSize);
    }

    private fetchProducts(productService: ProductsService) {
        console.log('estoy en fetchProducts');
        console.log('1');

        productService.getAllProducts()
            .subscribe(products => {
                console.log('2');
                this.data = products;
            });

    }

    private getSortedData(data: Product[]) {
        if (!this.sort.active || this.sort.direction === '') {
            return data;
        }

        return data.sort((a, b) => {
            const isAsc = this.sort.direction === 'asc';
            switch (this.sort.active) {
                case 'title': return compare(a.title, b.title, isAsc);
                case 'price': return compare(a.price, b.price, isAsc);
                case 'title': return compare(a.description, b.description, isAsc);
                case 'id': return compare(+a.id, +b.id, isAsc);
                default: return 0;
            }
        });
    }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


function fetch_Products(productService: ProductsService) {
    console.log('estoy en fetchProducts');
    console.log('1');
    productService.getAllProducts()
        .subscribe(products => {
            console.log('2');
            return products;
        });
}


