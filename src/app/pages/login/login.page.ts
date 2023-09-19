import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireserviceService } from 'src/app/fireservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
email: any;
password: any;


  constructor(public router: Router,
    public fireservice: FireserviceService) { }

  ngOnInit() {
  }

  navigatetoLogin() {
    this.fireservice.loginWithEmail({ email: this.email, password: this.password }).then((res: any) => {
      console.log(res);
      if (res.user.uid) {
        this.fireservice.getDetails({ uid: res.user.uid }).subscribe({
          next: (res: any) => {
            console.log(res);
            alert('Welcome ' + res['name']);
            this.router.navigate(['/folder/home'])
          },
          error: (err: any) => {
            console.log(err);
          }
        });
      }
    }, err => {
      alert(err.message)
      console.log(err);
    });
    // this.router.navigate(['/login']);
  }
  
  navigatetosignup(){
    this.router.navigate(['/signup']);
  }

  
}
