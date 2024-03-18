import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Modules/auth/auth.service';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { AdminService } from '../../../admin.service';

@Component({
  selector: 'app-view-as',
  templateUrl: './view-as.component.html',
  styleUrls: ['./view-as.component.scss']
})
export class ViewAsComponent {
  id!: number
  constructor(private fb: FormBuilder,public adminService: AdminService, private _snackBar: MatSnackBar,
    public dialog: MatDialog, private authService: AuthService, private route: ActivatedRoute,
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
      this.id = data.id;
    }

  ngOnDestroy() {
    if(this.baseSub){
      this.baseSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.editBase()
  }

  baseSub!: Subscription;
  base!: any;
  roleId : any;
  editBase(){
    if(this.data.type.toLowerCase() === 'base'){
      this.baseSub = this.adminService.getAsianetSaleById(this.id).subscribe(data => {
        this.base = data
      })
    }else if(this.data.type.toLowerCase() === 'followup'){
      this.baseSub = this.adminService.getAsianetSaleFollowById(this.id).subscribe(data => {
        this.base = data
      })
    }
  }
}
