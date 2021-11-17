import {  Component, OnInit } from '@angular/core';
import { IProduct } from '../../model/product';
import { ActivatedRoute } from '@angular/router';
import  { ProductService } from '../../service/product.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  videoId = "t_E2_xs6Nns"
  product?: IProduct ;
 
  constructor(private route: ActivatedRoute, private service: ProductService) { }

  ngOnInit() {
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = String ( routeParams.get('productId') );
  
    // Find the product that correspond with the id provided in route.
    //this.product = this.service.getProducts//products.find(product => product.id === productIdFromRoute);
    this.getProduct(productIdFromRoute);
  }

  getProduct(id: string) :void {
    let myProducts: IProduct[] = [];

    this.service.getProducts().subscribe(
      products => myProducts = products
    );

    //this.ProductService.getProducts().subscribe(products => this.products = products);
    this.product = myProducts.find(e => e.productId === id);
  }

  convertIdString(): number {
    return Number.parseInt(this.product!.productId);
  }
}
