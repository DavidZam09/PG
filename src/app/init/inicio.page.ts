import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  rol: 'Usuario' | 'Administrador' = null;
  userId: string = null;
  user: User = null;
  constructor(private rute: Router, private database: AuthService, private fire: DbService,private menuCtrl: MenuController) { }

  ngOnInit() {
    this.database.stateUser().subscribe(res => {
      if (res) {
        this.getDataUser(res.uid)
      } else {
        console.log("no login")
      }
    });
    this.database.stateUser().subscribe(res => {
      this.getUid();
    });
  }
 
  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }
  async getUid() {
    const id = await this.database.getUid();
    if (id) {
      this.userId = id;
      this.getInfoUser();
    } else {
      console.log("no user")
    }
  }
  getInfoUser() {
    const path = 'users/';
    const id = this.userId;
    this.fire.getDoc<User>(path, id).subscribe(res => {
      if (res) {
        this.user = res;
      }

    })
  }
  getDataUser(uid: string) {
    const path = "users/";
    const id = uid;
    this.fire.getDoc<User>(path, id).subscribe(res => {
      if (res) {
        this.rol = res.perfil
      }
    });
  }

}
