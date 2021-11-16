import { Component } from '@angular/core';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Connection';

  constructor(
    private userService: UserService
  ) {

  }

  isloggedIn(): Boolean{
    return this.userService.checkLoggedIn()
  }
}