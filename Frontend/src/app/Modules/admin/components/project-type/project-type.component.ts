import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Modules/auth/auth.service';
import { Role } from 'src/app/Modules/auth/models/role';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { AdminService } from '../../admin.service';
import { ProjectType } from '../../models/projectType';

@Component({
  selector: 'app-project-type',
  templateUrl: './project-type.component.html',
  styleUrls: ['./project-type.component.scss']
})
export class ProjectTypeComponent {
  constructor(private fb: FormBuilder,public adminService: AdminService, private _snackBar: MatSnackBar,
    public dialog: MatDialog, private authService: AuthService){}

  ngOnDestroy() {
    this.getSubscription?.unsubscribe()
  }

  projectTypeForm = this.fb.group({
    typeName: ['', Validators.required]
  });

  displayedColumns : string[] = ['id','typeName','manage']

  ngOnInit(): void {
    this.getProjectType()
  }

  onSubmit(){
    this.adminService.addProjectType(this.projectTypeForm.getRawValue()).subscribe((res)=>{
      this._snackBar.open("Project Type added successfully...","" ,{duration:3000})
      this.clearControls()
    },(error=>{
      alert(error)
    }))
  }

  clearControls(){
    this.getProjectType()
    this.projectTypeForm.reset()
    this.projectTypeForm.setErrors(null)
    Object.keys(this.projectTypeForm.controls).forEach(key=>{this.projectTypeForm.get(key)?.setErrors(null)})
  }

  types: ProjectType[] = [];
  getSubscription? : Subscription
  getProjectType(){
    this.getSubscription = this.adminService.getProjectType().subscribe((res)=>{
      this.types = res
    })
  }

  deletetProjectType(id : any){
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.adminService.deleteProjectType(id).subscribe((res)=>{
          this.getProjectType()
          this._snackBar.open("Project Type deleted successfully...","" ,{duration:3000})
        },(error=>{
          this._snackBar.open(error.error.message,"" ,{duration:3000})
        }))
      }
    })
  }

  isEdit = false;
  typeId : any;
  editProjectType(id : any){
    this.isEdit = true;
    //Get the product based on the ID
    let role: any= this.types.find(x =>x.id == id)

    //Populate the object by the ID
    let typeName = role.typeName.toString();

    this.projectTypeForm.patchValue({typeName : typeName})
    this.typeId = id;
  }

  editFunction(){
    this.isEdit = false;

    let data: any ={
      typeName : this.projectTypeForm.get('typeName')?.value
    }

    this.adminService.updateProjectType(this.typeId, data).subscribe((res)=>{
      this._snackBar.open("Role updated successfully...","" ,{duration:3000})
      this.getProjectType();
      this.clearControls();
    },(error=>{
          alert(error.message)
        }))
  }

}
