import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtherServicesPageRoutingModule } from './other-services-routing.module';

import { OtherServicesPage } from './other-services.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtherServicesPageRoutingModule
  ],
  declarations: [OtherServicesPage]
})
export class OtherServicesPageModule {}
