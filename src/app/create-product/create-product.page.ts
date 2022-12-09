import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cities, Product } from '../interfaces/product';
import { DbService } from '../services/db.service';
import { InteractionService } from '../services/interaction.service';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.page.html',
  styleUrls: ['./create-product.page.scss'],
})
export class CreateProductPage implements OnInit {

  cities = Cities;

  data: Product = {
    id: this.database.getId(),
    nameProd: '',
    supplier: '',
    ft: '',
    composition: null,
    danger: '',
    numberCase: '',
    transport: null,
    city: 'Cali',
    url: null,
  }
  private ruter = 'products/';

  constructor(private interaction: InteractionService, private rute: Router, private database: DbService) { }

  ngOnInit() {
    this.data.nameProd = '';
    this.data.numberCase = '';
    this.data.danger = '';

  }
  async createProduct() {
    await this.interaction.presentLoading('Creando...');
    await this.database.createDoc(this.data, this.ruter, this.data.id);
    this.interaction.presentToast('Creado con exito');
    this.interaction.dismissLoading();
    this.rute.navigate(['/inventory']);
  }
}
