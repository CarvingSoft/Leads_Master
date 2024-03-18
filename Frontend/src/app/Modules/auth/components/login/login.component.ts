import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators ,FormsModule, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import{AuthService} from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({

    employeeNo: [null, [Validators.required]],
    password:[null,Validators.required,]


  });

  hasUnitNumber = false;



  constructor(private fb: FormBuilder ,private authService:AuthService,private router:Router) { }

  user :any;
  ngOnInit(): void {
    this.setCurrentUser();
  }

  token : any;
  onSubmit(){
    this.authService.login(this.loginForm.getRawValue()).subscribe((res)=>{
      this.token = res
      // localStorage.setItem('token', this.token.token)
      if(this.token){
        this.setCurrentUser()
      }
    },(error=>{
      alert(error.error.message)
    }))
  }

  setCurrentUser(){
    if(localStorage.getItem('token')){
      const token: any = localStorage.getItem('token')
      let user = JSON.parse(token)

      let roleid = user.role

      this.authService.getRoleById(roleid).subscribe((res)=>{
        let role = res.roleName.toLowerCase();

        this.router.navigate([role]);
    })
  }

}
}
