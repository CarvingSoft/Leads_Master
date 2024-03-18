import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Modules/auth/auth.service';
import { Asianet } from 'src/app/Modules/telecaller/Models/asianet_base';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { AdminService } from '../../../admin.service';
import { Bajaj } from 'src/app/Modules/telecaller/Models/bajaj_base';

@Component({
  selector: 'app-bajaj',
  templateUrl: './bajaj.component.html',
  styleUrls: ['./bajaj.component.scss']
})
export class BajajComponent {
  id!: number
  constructor(private fb: FormBuilder,public adminService: AdminService, private _snackBar: MatSnackBar,
    public dialog: MatDialog, private authService: AuthService, private route: ActivatedRoute,
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
      this.id = data.id;
    }

  ngOnDestroy() {
    this.baseSub.unsubscribe();
    if(this.editSub){
      this.editSub.unsubscribe();
    }
  }

  editForm = this.fb.group({
    subCode: [''],
    name: [''],
    balance: [''],
    mobile: [''],
    emi: [''],
    product: [''],
    status: [''],
    remarks: [''],
    freeText: [''],
    action: [''],
    teleCallerId: ['']
  });

  ngOnInit(): void {
    this.editBase()
  }

  baseSub!: Subscription;
  base!: any;
  roleId : any;
  editBase(){
    if(this.data.type === 'base'){
      this.baseSub = this.adminService.getBajajById(this.id).subscribe(data => {
        this.base = data

        //Populate the object by the ID
        let subCode = this.base.subCode?.toString();
        let name = this.base.name?.toString();
        let balance = this.base.balance?.toString();
        let mobile = this.base.mobile?.toString();
        let emi = this.base.emi?.toString();
        let product = this.base.product?.toString();
        let status = this.base.status?.toString();
        let remarks = this.base.remarks?.toString();
        let freeText = this.base.freeText?.toString();
        let action = this.base.action?.toString();
        this.editForm.patchValue({
          subCode : subCode,
          name : name,
          balance : balance,
          mobile : mobile,
          emi : emi,
          product : product,
          status : status,
          remarks : remarks,
          freeText : freeText,
          action : action
        })
      })
    }else if(this.data.type === 'follow'){
      this.baseSub = this.adminService.getBajajFollowById(this.id).subscribe(data => {
        this.base = data

        //Populate the object by the ID
        let subCode = this.base.subCode?.toString();
        let name = this.base.name?.toString();
        let balance = this.base.balance?.toString();
        let mobile = this.base.mobile?.toString();
        let emi = this.base.emi?.toString();
        let product = this.base.product?.toString();
        let status = this.base.status?.toString();
        let remarks = this.base.remarks?.toString();
        let freeText = this.base.freeText?.toString();
        let action = this.base.action?.toString();
        this.editForm.patchValue({
          subCode : subCode,
          name : name,
          balance : balance,
          mobile : mobile,
          emi : emi,
          product : product,
          status : status,
          remarks : remarks,
          freeText : freeText,
          action : action
        })
      })
    }
  }

  editSub!: Subscription;
  editFunction(){
     let data: any ={
      subCode : this.editForm.get('subCode')?.value,
      name : this.editForm.get('name')?.value,
      balance : this.editForm.get('balance')?.value,
      mobile : this.editForm.get('mobile')?.value,
      emi : this.editForm.get('emi')?.value,
      product : this.editForm.get('product')?.value,
      status : this.editForm.get('status')?.value,
      remarks : this.editForm.get('remarks')?.value,
      freeText : this.editForm.get('freeText')?.value,
      action : this.editForm.get('action')?.value
    }

    if(this.data.type === 'base'){
      this.editSub = this.adminService.updateBajajById(this.id, data).subscribe((res)=>{
        this._snackBar.open("Bajaj updated successfully...","" ,{duration:3000})
        this.clearControls();
        this.dialogRef.close();
      },(error=>{
            alert(error.message)
          }))
    }else if(this.data.type === 'follow'){
      this.editSub = this.adminService.updateBajajFolowById(this.id, data).subscribe((res)=>{
        this._snackBar.open("Bajaj updated successfully...","" ,{duration:3000})
        this.clearControls();
        this.dialogRef.close();
      },(error=>{
            alert(error.message)
          }))
    }
  }

  clearControls(){
    this.editForm.reset()
    this.editForm.setErrors(null)
    Object.keys(this.editForm.controls).forEach(key=>{this.editForm.get(key)?.setErrors(null)})
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  deleteRole(id : any){
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.authService.deleteRole(id).subscribe((res)=>{

          this._snackBar.open("Role deleted successfully...","" ,{duration:3000})
        },(error=>{
          this._snackBar.open(error.error.message,"" ,{duration:3000})
        }))
      }
    })
  }

}
