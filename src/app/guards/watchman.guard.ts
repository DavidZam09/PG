import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})

export class WatchmanGuard implements CanActivate {

  constructor(private auth: AuthService, private r: Router) { };
  login: any;

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.hasUser()) {
      return true;
    }
  }
  hasUser(): boolean {

    this.auth.stateUser().subscribe(res => {
      if (res) {
        this.login = true;
        console.log(this.login);
      } else {
        this.r.navigate(['/'])
      }
    });
    return this.login;
  }

}

