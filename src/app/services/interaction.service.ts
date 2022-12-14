import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  constructor(
    private router: Router,
    private auth: AuthService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController) { }


  async presentLoading(message: string) {
    await this.loadingController.create({
      spinner: 'circles',
      message: message,
    }).then(res => {
      res.present();
    });

  }

  async dismissLoading() {
    await this.loadingController.dismiss().then(err => {
      err.valueOf;
    })
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      cssClass: 'custom-loading',
      message: message,
      duration: 2000
    });
    toast.present();
  }
  async presentLoadingOnly() {
    const loading = await this.loadingController.create({
      spinner: 'circles',
    });
    await loading.present();
  }
  showConfirm() {
    this.alertController.create({
      header: 'Cerrar Sesion',
      subHeader: 'Estas Seguro?',
      message: 'Presione "Aceptar" Para cerrar sesion',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Wathever')
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.auth.logout();
            this.presentToast('logout');
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }
}

