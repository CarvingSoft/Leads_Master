import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/Modules/auth/auth.service';
import { User } from 'src/app/Modules/auth/models/user';
import { AdminService } from '../../../admin.service';
import { Project } from '../../../models/project';
import { MatDialog } from '@angular/material/dialog';
import { AsianetSalesComponent } from '../asianet-sales/asianet-sales.component';
import { AsianetCollectionsComponent } from '../asianet-collections/asianet-collections.component';
import { ViSalesComponent } from '../vi-sales/vi-sales.component';
import { ViCollectionsComponent } from '../vi-collections/vi-collections.component';
import { BajajComponent } from '../bajaj/bajaj.component';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';

@Component({
  selector: 'app-edit-base',
  templateUrl: './edit-base.component.html',
  styleUrls: ['./edit-base.component.scss']
})
export class EditBaseComponent {
  constructor(private adminService: AdminService, private fb: FormBuilder, private authService: AuthService,
    private _snackBar: MatSnackBar, private dialog: MatDialog){}

  ngOnDestroy() {}

  editForm = this.fb.group({
    type: ['', Validators.required],
    projectId: ['', Validators.required],
    assignedToId: ['']
  })

  ngOnInit(){
    this.getProject()
  }

  project$!: Observable<Project[]>
  getProject() {
    this.project$ = this.adminService.getProject()
  }

  type = [{type: "Base"}, {type: "FollowUp"}]

  data: any;
  projectName!: string
  base: any[] = [];;
  userId!: any
  count!: number
  getProjectBase(){
    if(this.editForm.getRawValue().type === 'Base'){
      this.adminService.getProjectById(this.editForm.getRawValue().projectId).subscribe((res)=>{
        this.projectName = res.projectName.toLowerCase()

        let data: any;
        if(this.projectName === "asianetsales"){
          this.adminService.getAllAsianetSales().subscribe(data =>{
            this.base = data
          })
        }
        if(this.projectName === "asianetcollections"){
          this.adminService.getAllAsianetCollections().subscribe(data =>{
            this.base = data
          })
        }
        if(this.projectName === "visales"){
          this.adminService.getAllViSales().subscribe(data =>{
            this.base = data
            this.count = this.base.length;
          })
        }
        if(this.projectName === "vicollections"){
          this.adminService.getAllViCollections().subscribe(data =>{
            this.base = data
            this.count = this.base.length;
          })
        }
        if(this.projectName === "bajaj"){
          this.adminService.getAllBajaj().subscribe(data =>{
            this.base = data
            this.count = this.base.length;
          })
        }
      })
    }
    else{
      this.adminService.getProjectById(this.editForm.getRawValue().projectId).subscribe((res)=>{
        this.projectName = res.projectName.toLowerCase()
        let data: any;

        if(this.projectName === "asianetsales"){
          this.adminService.getAllAsianetSalesFollowup().subscribe(data =>{
            this.base = data
          })
        }
        if(this.projectName === "asianetcollections"){
          this.adminService.getAllAsianetCollectionsFollowup().subscribe(data =>{
            this.base = data
            this.count = this.base.length;
            this.getProjectBase()
          })
        }
        if(this.projectName === "visales"){
          this.adminService.getAllViSalesFollowup().subscribe(data =>{
            this.base = data
            this.count = this.base.length;
          })
        }
        if(this.projectName === "vicollections"){
          this.adminService.getAllViCollectionsFollowup().subscribe(data =>{
            this.base = data
            this.count = this.base.length;
          })
        }
        if(this.projectName === "bajaj"){
          this.adminService.getAllBajajFollowup().subscribe(data =>{
            this.base = data
            this.count = this.base.length;
          })
        }
      })
    }
  }

  editStatus: boolean = false;
  editBase(id: number){
    if(this.editForm.getRawValue().type === 'Base'){
      if(this.projectName === 'asianetsales'){
        const dialogRef = this.dialog.open(AsianetSalesComponent, {
          data: {
            id: id,
            type: 'base'
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          this.getProjectBase()
        })
      }
      if(this.projectName === 'asianetcollections'){
        const dialogRef = this.dialog.open(AsianetCollectionsComponent, {
          data: {
            id: id,
            type: 'base'
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          this.getProjectBase()
        })
      }
      if(this.projectName === 'visales'){
        const dialogRef = this.dialog.open(ViSalesComponent, {
          data: {
            id: id,
            type: 'base'
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          this.getProjectBase()
        })
      }
      if(this.projectName === 'vicollections'){
        const dialogRef = this.dialog.open(ViCollectionsComponent, {
          data: {
            id: id,
            type: 'base'
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          this.getProjectBase()
        })
      }
      if(this.projectName === 'bajaj'){
        const dialogRef = this.dialog.open(BajajComponent, {
          data: {
            id: id,
            type: 'base'
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          this.getProjectBase()
        })
      }
    }else{
      if(this.projectName === 'asianetsales'){
        const dialogRef = this.dialog.open(AsianetSalesComponent, {
          data: {
            id: id,
            type: 'follow'
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          this.getProjectBase()
        })
      }
      if(this.projectName === 'asianetcollections'){
        const dialogRef = this.dialog.open(AsianetCollectionsComponent, {
          data: {
            id: id,
            type: 'follow'
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          this.getProjectBase()
        })
      }
      if(this.projectName === 'visales'){
        const dialogRef = this.dialog.open(ViSalesComponent, {
          data: {
            id: id,
            type: 'follow'
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          this.getProjectBase()
        })
      }
      if(this.projectName === 'vicollections'){
        const dialogRef = this.dialog.open(ViCollectionsComponent, {
          data: {
            id: id,
            type: 'follow'
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          this.getProjectBase()
        })
      }
      if(this.projectName === 'bajaj'){
        const dialogRef = this.dialog.open(BajajComponent, {
          data: {
            id: id,
            type: 'follow'
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          this.getProjectBase()
        })
      }
    }
  }

  deleteBase(id: number){
    if(this.editForm.getRawValue().type === 'Base'){
      if(this.projectName === 'asianetsales'){
        const dialogRef = this.dialog.open(DeleteComponent, {
          data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result === true) {
            this.adminService.deleteAsianetSalesById(id).subscribe((res)=>{
              this.getProjectBase()
              this._snackBar.open("Base deleted successfully...","" ,{duration:3000})
            },(error=>{
              this._snackBar.open(error.error.message,"" ,{duration:3000})
            }))
          }
        })
      }
      if(this.projectName === 'asianetcollections'){
        const dialogRef = this.dialog.open(DeleteComponent, {
          data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result === true) {
            this.adminService.deleteAsianetCollById(id).subscribe((res)=>{
              this.getProjectBase()
              this._snackBar.open("Base deleted successfully...","" ,{duration:3000})
            },(error=>{
              this._snackBar.open(error.error.message,"" ,{duration:3000})
            }))
          }
        })
      }
      if(this.projectName === 'visales'){
        const dialogRef = this.dialog.open(DeleteComponent, {
          data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result === true) {
            this.adminService.deleteViById(id).subscribe((res)=>{
              this.getProjectBase()
              this._snackBar.open("Base deleted successfully...","" ,{duration:3000})
            },(error=>{
              this._snackBar.open(error.error.message,"" ,{duration:3000})
            }))
          }
        })
      }
      if(this.projectName === 'vicollections'){
        const dialogRef = this.dialog.open(DeleteComponent, {
          data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result === true) {
            this.adminService.deleteViCollById(id).subscribe((res)=>{
              this.getProjectBase()
              this._snackBar.open("Base deleted successfully...","" ,{duration:3000})
            },(error=>{
              this._snackBar.open(error.error.message,"" ,{duration:3000})
            }))
          }
        })
      }
      if(this.projectName === 'bajaj'){
        const dialogRef = this.dialog.open(DeleteComponent, {
          data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result === true) {
            this.adminService.deleteBajajById(id).subscribe((res)=>{
              this.getProjectBase()
              this._snackBar.open("Base deleted successfully...","" ,{duration:3000})
            },(error=>{
              this._snackBar.open(error.error.message,"" ,{duration:3000})
            }))
          }
        })
      }
    }else if(this.editForm.getRawValue().type === 'Follow'){
      if(this.projectName === 'asianetsales'){
        const dialogRef = this.dialog.open(DeleteComponent, {
          data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result === true) {
            this.adminService.deleteAsianetSalesFollowById(id).subscribe((res)=>{
              this.getProjectBase()
              this._snackBar.open("Base deleted successfully...","" ,{duration:3000})
            },(error=>{
              this._snackBar.open(error.error.message,"" ,{duration:3000})
            }))
          }
        })
      }
      if(this.projectName === 'asianetcollections'){
        const dialogRef = this.dialog.open(DeleteComponent, {
          data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result === true) {
            this.adminService.deleteAsianetCollFollowById(id).subscribe((res)=>{
              this.getProjectBase()
              this._snackBar.open("Base deleted successfully...","" ,{duration:3000})
            },(error=>{
              this._snackBar.open(error.error.message,"" ,{duration:3000})
            }))
          }
        })
      }
      if(this.projectName === 'visales'){
        const dialogRef = this.dialog.open(DeleteComponent, {
          data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result === true) {
            this.adminService.deleteViFollowById(id).subscribe((res)=>{
              this.getProjectBase()
              this._snackBar.open("Base deleted successfully...","" ,{duration:3000})
            },(error=>{
              this._snackBar.open(error.error.message,"" ,{duration:3000})
            }))
          }
        })
      }
      if(this.projectName === 'vicollections'){
        const dialogRef = this.dialog.open(DeleteComponent, {
          data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result === true) {
            this.adminService.deleteViCollFollowById(id).subscribe((res)=>{
              this.getProjectBase()
              this._snackBar.open("Base deleted successfully...","" ,{duration:3000})
            },(error=>{
              this._snackBar.open(error.error.message,"" ,{duration:3000})
            }))
          }
        })
      }
      if(this.projectName === 'bajaj'){
        const dialogRef = this.dialog.open(DeleteComponent, {
          data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result === true) {
            this.adminService.deleteBajajFollowById(id).subscribe((res)=>{
              this.getProjectBase()
              this._snackBar.open("Base deleted successfully...","" ,{duration:3000})
            },(error=>{
              this._snackBar.open(error.error.message,"" ,{duration:3000})
            }))
          }
        })
      }
    }
  }


  clearControls(){
    this.editForm.reset()
    this.editForm.setErrors(null)
    Object.keys(this.editForm.controls).forEach(key=>{this.editForm.get(key)?.setErrors(null)})
  }
}

