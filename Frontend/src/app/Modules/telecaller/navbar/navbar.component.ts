import { BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isExpanded : boolean = false;

  userName: string
  userId!: number
  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService, private router: Router,
    private _snackBar: MatSnackBar,private dialog: MatDialog) {

    const token: any = localStorage.getItem('token')
    let user = JSON.parse(token)
    this.userName = user.employeeNo.toUpperCase()
    this.userId = user.id

    // this.startCounter();
  }

  myProfile(){
    this.router.navigateByUrl('admin/settings/userdetails/'+ this.userId)
  }

  logOut(){
    this.authService.logout()
    this.router.navigateByUrl('')
  }

  ngOnDestroy(): void {
    // clearInterval(this.intervalId);
  }

}
