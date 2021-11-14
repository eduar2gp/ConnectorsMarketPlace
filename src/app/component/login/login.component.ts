import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFailed: boolean = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Called when the login form is submitted. 
   * Attempts to log the user in.
   */
  onSubmit() {
    // Send our information to the "server" and attempt to log in
    console.log("submited", this.loginForm.get("email")?.value, this.loginForm.get("password")?.value);
    this.userService.loginUser(
      this.loginForm.get("email")?.value,
      this.loginForm.get("password")?.value).subscribe(
        (loginSucceeded) => {
          this.loginFailed = !loginSucceeded;

          // If we logged in, return to the main page
          if (loginSucceeded) {
            this.router.navigate(['']);
          }
        }
      );
  }
}
