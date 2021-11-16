import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

/**
 * Here, the user can submit their information to log in.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFailed: boolean = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(3), Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  hidePass: boolean = true;

  constructor(private userService: UserService, private router: Router, private myHttp: HttpClient) { }

  ngOnInit(): void {
  }

  /**
   * Attempts to log the user in with submitted information.
   */
  onSubmit() {
    // Send our information to the "server" and attempt to log in
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
