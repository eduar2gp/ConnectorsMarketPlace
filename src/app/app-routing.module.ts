import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './component/product/product.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { BenefitComponent } from './component/benefit/benefit.component';
import { FeatureComponent } from './component/feature/feature.component';
import { LoginComponent } from './component/login/login.component';
import { ReviewFeedComponent } from './component/review/review-feed/review-feed.component';
import { UseCaseComponent } from './component/use-case/use-case.component';
import { ProductDetailComponent } from './component/product-detail/product-detail.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'product', component: ProductComponent },
  { path: 'benefit', component: BenefitComponent },
  { path: 'feature', component: FeatureComponent },
  { path: 'login', component: LoginComponent},
  { path: 'reviews', component: ReviewFeedComponent},
  { path: 'product-detail', component: ProductDetailComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
