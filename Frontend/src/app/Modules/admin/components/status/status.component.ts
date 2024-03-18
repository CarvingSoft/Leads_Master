import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Modules/auth/auth.service';
import { Role } from 'src/app/Modules/auth/models/role';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { AdminService } from '../../admin.service';
import { Status } from '../../models/status';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent {
  constructor(private fb: FormBuilder,public adminService: AdminService, private _snackBar: MatSnackBar,
    public dialog: MatDialog, private authService: AuthService){}

  ngOnDestroy() {
    this.statusSubscription?.unsubscribe()
    if(this.addSub){
      this.addSub.unsubscribe()
    }
    if(this.deleteSub){
      this.deleteSub.unsubscribe()
    }
    if(this.editSub){
      this.editSub.unsubscribe()
    }
  }

  statusForm = this.fb.group({
    status: ['', Validators.required]
  });

  displayedColumns : string[] = ['id','status','manage']

  ngOnInit(): void {
    this.getStatus()
  }

  addSub!: Subscription;
  onSubmit(){
    this.addSub = this.adminService.addStatus(this.statusForm.getRawValue()).subscribe((res)=>{
      this._snackBar.open("Status added successfully...","" ,{duration:3000})
      this.clearControls()
    },(error=>{
      alert(error)
    }))
  }

  clearControls(){
    this.statusForm.reset()
    this.statusForm.setErrors(null)
    Object.keys(this.statusForm.controls).forEach(key=>{this.statusForm.get(key)?.setErrors(null)})
    this.getStatus()
  }

  status: Status[] = [];
  statusSubscription? : Subscription
  getStatus(){
    this.statusSubscription = this.adminService.getStatus().subscribe((res)=>{
      this.status = res
    })
  }

  deleteSub!: Subscription;
  deleteStatus(id : any){
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteSub = this.adminService.deleteStatus(id).subscribe((res)=>{
          this.getStatus()
          this._snackBar.open("Status deleted successfully...","" ,{duration:3000})
        },(error=>{
          this._snackBar.open(error.error.message,"" ,{duration:3000})
        }))
      }
    })
  }

  isEdit = false;
  statId! : number;
  editStatus(id : number){
    this.isEdit = true;
    //Get the product based on the ID
    let role: any= this.status.find(x =>x.id == id)

    //Populate the object by the ID
    let status = role.status.toString();

    this.statusForm.patchValue({status : status})
    this.statId = id;
  }

  editSub!: Subscription;
  editFunction(){
    this.isEdit = false;

    let data: any ={
      status : this.statusForm.get('status')?.value
    }

    this.editSub = this.adminService.updateStatus(this.statId, data).subscribe((res)=>{
      this._snackBar.open("Status updated successfully...","" ,{duration:3000})
      this.clearControls();
    },(error=>{
          alert(error.message)
        }))
  }

}
