import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'client', loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule) },
  { path: 'produit', loadChildren: () => import('./produits/produits.module').then(m => m.ProduitsModule) },
  { path: 'categorie', loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule) },
  { path: 'facture', loadChildren: () => import('./factures/factures.module').then(m => m.FacturesModule) },
  { path: 'reglement', loadChildren: () => import('./reglements/reglements.module').then(m => m.ReglementsModule) },
  { path: 'stock', loadChildren: () => import('./stocks/stocks.module').then(m => m.StocksModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
