import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.page.html',
  styleUrls: ['./articles.page.scss'],
})
export class ArticlesPage implements OnInit {
  articulos = null;
  art = {
    codigo: null,
    descripcion: null,
    precio: null,
  }

  constructor(private articulosServicio: DbService) { }

  ngOnInit() {
    this.recoveryAll();
  }
  recoveryAll() {
    this.articulosServicio.recuperarTodos().subscribe(result => this.articulos = result);
  }
  up() {
    this.articulosServicio.alta(this.art).subscribe(datos => {
      if (datos['resultado'] == 'OK') {
        alert(datos['mensaje']);
        this.recoveryAll();
      }
    });
  }
  down(codigo) {

    this.articulosServicio.baja(codigo).subscribe(datos => {
      if (datos['resultado'] == 'OK') {
        alert(datos['menseaje']);
        this.recoveryAll();
      }
    })
  }
  modify() {
    this.articulosServicio.modificacion(this.art).subscribe(datos => {
      if (datos['resultado'] == "OK") {
        alert(datos['mensaje']);
        this.recoveryAll();
      }
    })
  }

  select(codigo) {
    this.articulosServicio.selecionar(codigo).subscribe(res => this.art = res[0]);
  }
  register() {
    return true;
  }
}
