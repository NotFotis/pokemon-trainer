import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  implements OnInit{
  get user(): User | undefined{
    return this.userService.user;
  }
constructor(
  private readonly userService: UserServiceService
){}

ngOnInit(): void {
    
}
}
