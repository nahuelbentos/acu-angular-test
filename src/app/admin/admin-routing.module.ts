import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { NavComponent } from './components/nav/nav.component';
import { TreeComponent } from './components/tree/tree.component';
import { TableComponent } from './components/table/table.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DragDropComponent } from './components/drag-drop/drag-drop.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { OrdenListComponent } from './components/orden-list/orden-list.component';


const routes: Routes = [

  {
    path: '',
    component: NavComponent,
    children: [
      {
        path: 'home',
        component: DashboardComponent
      },
      {
        path: 'products',
        component: ProductsListComponent
      },
      {
        path: 'ordenes',
        component: OrdenListComponent
      },
      {
        path: 'create',
        component: ProductFormComponent
      },
      {
        path: 'tree',
        component: TreeComponent
      },
      {
        path: 'table',
        component: TableComponent
      },
      {
        path: 'drag-drop',
        component: DragDropComponent
      },
      {
        path: 'address-form',
        component: AddressFormComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
