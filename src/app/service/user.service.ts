import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { USERS } from '../database/mock-users';
import { IUser } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Hard-coded list of users
  // TODO: Set this up to be received from an Observable to better simulate reality

  constructor(private router: Router) { }

  /**
   * @returns array of users registered in our system
   */
  getUsers(): Observable<IUser[]> {
    const users = of(USERS);
    return users;
  }

  getUserById(id: number): Observable<IUser> {
    const user = of(USERS[id]);
    return user;
  }

  /**
   * Attempts to log user in by checking their email & password against registered users
   * @returns (login_successful)
   */
  loginUser(email:string, password: string): Observable<boolean> {
    
    // Using the USERS mock array because normally this validation would be done in the middle/back-end
    for (let user of USERS) {
      if (email === user.email && password === user.password) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userFirstName", user.firstName);
        localStorage.setItem("userId", user.id.toString());
        return of(true);
      }

    }
    return of(false);
  }
  /**
   * Removes localStorage data about current user and navigates to index page
   */
  logoutUser() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userFirstName");
    localStorage.removeItem("userId");
    this.router.navigate(['']);
  }

  /**
   * @returns true if logged in
   */
  checkLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
  /**
   * @returns current user's first name or '' if user is logged out
   */
  getUserFirstName(): string {
    let name = localStorage.getItem('userFirstName');
    return (name) ? name : "";
  }



}
