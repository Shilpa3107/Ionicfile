import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireserviceService } from 'src/app/fireservice.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  public name: any;
  public email: any;
  public password: any;
  constructor(
    public router: Router,
    public fireservice: FireserviceService
  ) { }

  ngOnInit() {
  }
  signup(){
   this.fireservice.signup({email:this.email, password: this.password}).then((res: any)=>{
    if(res.user.uid){
      let data={
        email:this.email,
        password:this.password,
        name:this.name,
        uid:res.user.uid
      }
      this.fireservice.saveDetails(data).then((res:any)=>{
        alert('Account Created!');
      },err=>{
        console.log(err);
      })
    }
  },err=>{
    alert(err.message);

    console.log(err);
   }
   )
  }

}
