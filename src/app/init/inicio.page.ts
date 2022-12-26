import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
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
  modes = ['date', 'date-time', 'month', 'month-year', 'time', 'time-date', 'year'];
  slectMode = 'date';
  showPicker: false;
  dateValue = format(new Date(), 'yyyy-MM-dd') + 'T09:00:00.00Z';
  formatedString = '';

  constructor(private database: AuthService, private fire: DbService, private menuCtrl: MenuController) {
    this.setToday();
  }

  setToday() {
    this.formatedString = format(parseISO(format(new Date(), 'yyyy-MM-dd') + 'T09:00:00.00Z'), 'HH:mm, MMM d, yyyy');

  }

  ngOnInit(): void {
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
