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
  selector: 'app-view-ac',
  templateUrl: './view-ac.component.html',
  styleUrls: ['./view-ac.component.scss']
})
export class ViewAcComponent {
  id!: number
  constructor(private fb: FormBuilder,public adminService: AdminService, private _snackBar: MatSnackBar,
    public dialog: MatDialog, private authService: AuthService, private route: ActivatedRoute,
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
      this.id = data.id;
    }

  ngOnDestroy() {
    this.baseSub.unsubscribe();
  }

  ngOnInit(): void {
    this.editBase()
  }

  baseSub!: Subscription;
  base!: any;
  roleId : any;
  editBase(){
    if(this.data.type === 'base'){
      this.baseSub = this.adminService.getAsianetCollById(this.id).subscribe(data => {
        this.base = data
      })
    }else if(this.data.type === 'follow'){
      this.baseSub = this.adminService.getAsianetCollFollowById(this.id).subscribe(data => {
        this.base = data
      })
    }
  }
}
