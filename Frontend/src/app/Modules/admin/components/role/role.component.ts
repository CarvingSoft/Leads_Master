import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Role } from 'src/app/Modules/auth/models/role';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { AdminService } from '../../admin.service';
import { AuthService } from 'src/app/Modules/auth/auth.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent {

  constructor(private fb: FormBuilder,public adminService: AdminService, private _snackBar: MatSnackBar,
    public dialog: MatDialog, private authService: AuthService){}

  ngOnDestroy() {
    this.roleSubscription?.unsubscribe()
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

  roleForm = this.fb.group({
    roleName: ['', Validators.required],
    status: [false]
  });

  displayedColumns : string[] = ['id','roleName','status','manage']

  ngOnInit(): void {
    this.getRoles()
  }

  addSub!: Subscription;
  onSubmit(){
    this.addSub = this.authService.addRole(this.roleForm.getRawValue()).subscribe((res)=>{
      this._snackBar.open("Role added successfully...","" ,{duration:3000})
      this.getRoles()
      this.clearControls()
    },(error=>{
      alert(error)
    }))
  }

  clearControls(){
    this.roleForm.reset()
    this.roleForm.setErrors(null)
    Object.keys(this.roleForm.controls).forEach(key=>{this.roleForm.get(key)?.setErrors(null)})
  }

  roles: Role[] = [];
  roleSubscription? : Subscription
  getRoles(){
    this.roleSubscription = this.authService.getRole().subscribe((res)=>{
      this.roles = res
    })
  }

  deleteSub!: Subscription;
  deleteRole(id : any){
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteSub = this.authService.deleteRole(id).subscribe((res)=>{
          this.getRoles()
          this._snackBar.open("Role deleted successfully...","" ,{duration:3000})
        },(error=>{
          this._snackBar.open(error.error.message,"" ,{duration:3000})
        }))
      }
    })
  }

  isEdit = false;
  roleId : any;
  editRole(id : any){
    this.isEdit = true;
    //Get the product based on the ID
    let role: any= this.roles.find(x =>x.id == id)

    //Populate the object by the ID
    let roleName = role.roleName.toString();
    let status = role.status

    this.roleForm.patchValue({roleName : roleName, status : status})
    this.roleId = id;
  }

  editSub!: Subscription;
  editFunction(){
    this.isEdit = false;

    let data: any ={
      roleName : this.roleForm.get('roleName')?.value,
      status : this.roleForm.get('status')?.value
    }

    this.editSub = this.authService.updateRole(this.roleId, data).subscribe((res)=>{
      this._snackBar.open("Role updated successfully...","" ,{duration:3000})
      this.getRoles();
      this.clearControls();
    },(error=>{
          alert(error.message)
        }))
  }

}
