import { Component } from '@angular/core';
import { ResetService } from '../services/resetservice/reset.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/tokenstorageservice/token-storage.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent {
  form:any={};
  constructor(private resetservice:ResetService, private router: Router,private ts: TokenStorageService) { }
  reset(){
    if(this.form.password == this.form.confirmpassword){
    const id=this.ts.getId()+"";
    console.log(id);
      this.resetservice.reset(id,this.form.password).subscribe((r:any)=>{
        console.log(r);
      },(error:any) => console.log(error));
  }}

}
