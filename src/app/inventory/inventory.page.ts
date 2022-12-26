import { Component, OnInit } from '@angular/core';
import { Product } from '../interfaces/product';
import { InteractionService } from '../services/interaction.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit {
  products: Product[] = [];
  data: Product;
  sProduct: any;

  constructor(
    private prod: ProductService,
    private inter: InteractionService) { }

  async ngOnInit() {
    await this.inter.presentLoadingOnly();
    this.prod.getProducts().subscribe(answer => {
      this.products = answer;
      this.sProduct = this.data;
      this.inter.dismissLoading();
    })
    console.log(this.products)
  }

}
