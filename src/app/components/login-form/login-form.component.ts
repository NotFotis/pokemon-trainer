import { Component } from '@angular/core';
import { NgForm } from '@angular/forms'
import { User } from 'src/app/models/user.model';
import { LoginServiceService } from 'src/app/service/login-service.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  // DI.
  constructor(private readonly loginService: LoginServiceService){  }

  public loginSubmit(loginForm: NgForm): void {

    //username
    const { username } = loginForm.value;    


    this.loginService.login(username)
      .subscribe({
        next: (user: User) => {
          
        },
        error: () => {

        }
      })
  }
}
