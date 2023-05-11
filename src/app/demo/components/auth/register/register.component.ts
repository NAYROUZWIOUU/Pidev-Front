import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { RegisterService } from 'src/app/services/registerservice/register.service';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService]
})

export class RegisterComponent {
  user: User=new User();


  disableButton: boolean = false;

  constructor(private router:Router,private us:RegisterService, private messageService: MessageService) { }
  AddUser(){
    this.disableButton = true;
    this.us.AddUser(this.user).subscribe( (data:any) =>{
      console.log(data);
        if(data.message == "success") {
          this.disableButton = false;
         // this.router.navigate(['/login'])
     // .then(() => {
     //   window.location.reload();
     // });

        }

        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Users Deleted', life: 3000 });

      },

      (error:any) => console.log(error));  }

}
