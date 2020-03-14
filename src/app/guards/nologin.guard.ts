import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, audit} from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})



export class NologinGuard implements CanActivate {
  constructor(private AFaith : AngularFireAuth, private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.AFaith.authState.pipe(map(auth => {
        if (isNullOrUndefined(auth)) {
          return true;
        } else {
          console.log(auth);
          this.router.navigate(['/home']);
          return false;
        }
      }))
  }
}
