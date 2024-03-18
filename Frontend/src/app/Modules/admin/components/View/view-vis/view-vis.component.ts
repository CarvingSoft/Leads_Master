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
  selector: 'app-view-vis',
  templateUrl: './view-vis.component.html',
  styleUrls: ['./view-vis.component.scss']
})
export class ViewVisComponent {
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
      this.baseSub = this.adminService.getViById(this.id).subscribe(data => {
        this.base = data
      })
    }else if(this.data.type === 'follow'){
      this.baseSub = this.adminService.getViFollowById(this.id).subscribe(data => {
        this.base = data

      })
    }
  }
}
