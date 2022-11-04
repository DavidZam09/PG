import { Component, } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { InteractionService } from 'src/app/services/interaction.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  credentials = {
    user: null,
    password: null,
  }

  constructor(private auth: AuthService, private interaction: InteractionService, private rute: Router, private menuCtrl: MenuController) { }

  async login() {
    await this.interaction.presentLoading('Cargando..');
    const answer = await this.auth.signIn(this.credentials.user, this.credentials.password).catch(error => {
      console.log(error);
      this.interaction.dismissLoading();
      this.interaction.presentToast('Error: Usuario o Contraseña incorrecta');
    });
    if (answer) {
      this.interaction.dismissLoading();
      this.interaction.presentToast('Ingreso Correcto');
      console.log('Hola');
      this.credentials.password = null;
      this.credentials.user = null;
      this.rute.navigateByUrl('/inicio')
    }

  }
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

}
