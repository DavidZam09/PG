import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import { DbService } from '../services/db.service';
import { InteractionService } from '../services/interaction.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  data: User;
  rol: 'Usuario' | 'Administrador' = null;

  constructor(private auth: AuthService,
    private interaction: InteractionService, private bd: DbService) { }
  ngOnInit() {
    this.auth.stateUser().subscribe(res => {
      if (res) {
        this.getDataUser(res.uid)
      }
    })
  }
  logout() {
    this.interaction.showConfirm();
  }
  getDataUser(uid: string) {
    const path = "users/";
    const id = uid;
    this.bd.getDoc<User>(path, id).subscribe(res => {
      if (res) {
        this.rol = res.perfil
      }
    });
  }
}


