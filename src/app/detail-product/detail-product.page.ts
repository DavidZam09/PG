import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cities, Product } from '../interfaces/product';
import { DbService } from '../services/db.service';
import { InteractionService } from '../services/interaction.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.page.html',
  styleUrls: ['./detail-product.page.scss'],
})
export class DetailProductPage implements OnInit {

  url: any;
  ft: any;
  data: Product = {
    id: '',
    nameProd: '',
    supplier: '',
    ft: '',
    composition: null,
    danger: '',
    numberCase: null,
    transport: null,
    city: 'Cali',
    url: '',
  }

  cities = Cities;
  ruter = 'products/';
  productId = null;
  constructor(private database: DbService,
    private rute: Router,
    private router: ActivatedRoute,
    private load: InteractionService,
    private productService: ProductService) { }

  ngOnInit() {
    this.productId = this.router.snapshot.params['id'];
    if (this.productId) {
      this.loadProduct();
    }
  }
  async loadProduct() {
    await this.load.presentLoading('Cargando...');
    this.productService.getProduct(this.productId).subscribe(answer => {
      this.load.dismissLoading();
      this.data = answer;
      this.url = answer.url;
      this.ft = answer.ft;
    })

  }
  async updateProduct() {
    await this.load.presentLoading('Creando...');
    await this.database.editDoc(this.data, this.ruter, this.productId);
    this.load.presentToast('Guardado con exito');
    this.load.dismissLoading();
    this.rute.navigate(['/inventory']);
  }
  deleteProduct(id: string) {
    this.database.deleteDoc(this.ruter, id);
  }

}
