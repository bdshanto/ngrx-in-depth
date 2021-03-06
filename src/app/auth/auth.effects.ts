import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { AuthActionTypes, Login, LogOut } from './auth.actions';
import { tap } from 'rxjs/operators';
import { defer, of } from 'rxjs';


@Injectable()
export class AuthEffects {
  @Effect({dispatch: false})
  login$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.LoginAction),
    tap(action => localStorage.setItem('user', JSON.stringify(action.payload.user)))
  );

  @Effect({dispatch: false})
  logout$ = this.actions$.pipe(
    ofType<LogOut>(AuthActionTypes.LogoutAction),
    tap(() => {
      localStorage.removeItem('user');
      this.router.navigateByUrl('/login');
    })
  );

  @Effect()
  init$ = defer(() => {
    const user = localStorage.getItem('user');
    if (user) {
      return of(new Login(JSON.parse(user)));
    } else {
      return of(new LogOut());
    }
  });

  constructor(private actions$: Actions, private router: Router) {
  }

}
