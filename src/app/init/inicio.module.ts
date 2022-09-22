import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioPageRoutingModule } from './inicio-routing.module';

import { InicioPage } from './inicio.page';
import { MenuComponent } from '../components/menu/menu.component';
import { InventoryPageModule } from '../inventory/inventory.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioPageRoutingModule,
    InventoryPageModule
  ],
  declarations: [InicioPage, MenuComponent]
})
export class InicioPageModule { }
