import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { LoginServiceService } from 'src/app/service/login-service.service';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  @Output() login: EventEmitter<void> = new EventEmitter();

  // DI.
  constructor(
    private readonly loginService: LoginServiceService,
    private readonly userService: UserServiceService,
  ){ }

  public loginSubmit(loginForm: NgForm): void {

    //username
    const { username } = loginForm.value;    


    this.loginService.login(username)
      .subscribe({
        next: (user: User) => {
          //redirect to the catalogue page
          this.userService.user = user;
          this.login.emit();
        },
        error: () => {

        }
      })
  }
}
