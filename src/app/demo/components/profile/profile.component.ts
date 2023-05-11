import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { TokenStorageService } from 'src/app/services/tokenstorageservice/token-storage.service';
import { AuthService } from 'src/app/services/authservice/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user!: User;
  id:any;
  constructor(private as:AuthService, private router: Router,private ts:TokenStorageService, private us:UserService) { }
  ngOnInit(): void {
    //this.user={...AppComponent.instance.getCurrentUser()};
    this.id=this.ts.getId();
    console.log(this.id);
    this.getCurrentUser(this.id);
  }

getCurrentUser(id:number){
  this.us.getUserById(this.id).subscribe((x:User)=>{
    this.user=x;
    console.log(x);
    return(x);
  },(error:any) => console.log(error));
}

  updateuser(){
    const id=this.ts.getId()+"";
    console.log(id);
    this.as.updateuser(this.user,id).subscribe((r:any)=>{
        console.log(r);
      },(error:any) => console.log(error));
  }
/*cancelUpdate() {
    this.user = ProfilepageComponent.instance.currentUser;
    ProfilepageComponent.instance.showUpdateProfile = false;
  }*/
}
