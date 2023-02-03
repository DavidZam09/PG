import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, isPlatform } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { ServiceWorkerModule } from '@angular/service-worker';

import { HttpClientModule } from '@angular/common/http';
import { File } from '@ionic-native/file/ngx';
import { FileOpener, } from '@ionic-native/file-opener/ngx';
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx'



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [HttpClientModule, BrowserModule, IonicModule.forRoot({
    rippleEffect: false,
    mode: 'md',
    backButtonText: 'Atras',
    animated: !isPlatform('mobileweb')
  }),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideAuth(() => getAuth()), provideFirestore(() => getFirestore()),
    AngularFireStorageModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    })],
  providers: [ File,
    FileOpener,
    { 
      provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy 
    }, PreviewAnyFile,
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
