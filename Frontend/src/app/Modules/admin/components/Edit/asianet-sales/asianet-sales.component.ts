import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Modules/auth/auth.service';
import { Role } from 'src/app/Modules/auth/models/role';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { AdminService } from '../../../admin.service';
import { ActivatedRoute } from '@angular/router';
import { AsianetSalesBase } from 'src/app/Modules/telecaller/Models/asianet_sales_base';

@Component({
  selector: 'app-asianet-sales',
  templateUrl: './asianet-sales.component.html',
  styleUrls: ['./asianet-sales.component.scss']
})
export class AsianetSalesComponent {
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
    Region: [''],
    Subcode: [''],
    Name: [''],
    Address: [''],
    Address1: [''],
    Address2: [''],
    Package: [''],
    Scheme: [''],
    Phone: [''],
    Balance: [''],
    Mobile: [''],
    status: [''],
    remarks: [''],
    freeText: [''],
    action: [''],
    Teleby: ['']
  });

  displayedColumns : string[] = ['id','roleName','status','manage']

  ngOnInit(): void {
    this.editBase()
  }

  baseSub!: Subscription;
  base!: any;
  roleId : any;
  editBase(){
    if(this.data.type === 'base'){
      this.baseSub = this.adminService.getAsianetSaleById(this.id).subscribe(data => {
        this.base = data
        //Populate the object by the ID
        let Region = this.base.Region?.toString();
        let Subcode = this.base.Subcode?.toString();
        let Name = this.base.Name?.toString();
        let Address = this.base.Address?.toString();
        let Address1 = this.base.Address1?.toString();
        let Address2 = this.base.Address2?.toString();
        let Package = this.base.Package?.toString();
        let Scheme = this.base.Scheme?.toString();
        let Phone = this.base.Phone?.toString();
        let Balance = this.base.Balance?.toString();
        let Mobile = this.base.Mobile?.toString();
        let status = this.base.status?.toString();
        let remarks = this.base.remarks?.toString();
        let freeText = this.base.freeText?.toString();
        let action = this.base.action?.toString();
        this.editForm.patchValue({
          Region : Region,
          Subcode : Subcode,
          Name : Name,
          Address : Address,
          Address1 : Address1,
          Address2 : Address2,
          Package : Package,
          Scheme : Scheme,
          Phone : Phone,
          Balance : Balance,
          Mobile : Mobile,
          status : status,
          remarks : remarks,
          freeText : freeText,
          action : action
        })
      })
    }
    else if(this.data.type === 'follow'){
      this.baseSub = this.adminService.getAsianetSaleFollowById(this.id).subscribe(data => {
        this.base = data

        //Populate the object by the ID
        let Region = this.base.Region?.toString();
        let Subcode = this.base.Subcode?.toString();
        let Name = this.base.Name?.toString();
        let Address = this.base.Address?.toString();
        let Address1 = this.base.Address1?.toString();
        let Address2 = this.base.Address2?.toString();
        let Package = this.base.Package?.toString();
        let Scheme = this.base.Scheme?.toString();
        let Phone = this.base.Phone?.toString();
        let Balance = this.base.Balance?.toString();
        let Mobile = this.base.Mobile?.toString();
        let status = this.base.status?.toString();
        let remarks = this.base.remarks?.toString();
        let freeText = this.base.freeText?.toString();
        let action = this.base.action?.toString();
        this.editForm.patchValue({
          Region : Region,
          Subcode : Subcode,
          Name : Name,
          Address : Address,
          Address1 : Address1,
          Address2 : Address2,
          Package : Package,
          Scheme : Scheme,
          Phone : Phone,
          Balance : Balance,
          Mobile : Mobile,
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
      Region : this.editForm.get('Region')?.value,
      Subcode : this.editForm.get('Subcode')?.value,
      Name : this.editForm.get('Name')?.value,
      Address : this.editForm.get('Address')?.value,
      Address1 : this.editForm.get('Address1')?.value,
      Address2 : this.editForm.get('Address2')?.value,
      Package : this.editForm.get('Package')?.value,
      Scheme : this.editForm.get('Scheme')?.value,
      Phone : this.editForm.get('Phone')?.value,
      Balance : this.editForm.get('Balance')?.value,
      Mobile : this.editForm.get('Mobile')?.value,
      status : this.editForm.get('status')?.value,
      remarks : this.editForm.get('remarks')?.value,
      freeText : this.editForm.get('freeText')?.value,
      action : this.editForm.get('action')?.value
    }

    if(this.data.type === 'base'){
      this.editSub = this.adminService.updateAsianetSaleById(this.id, data).subscribe((res)=>{
        this._snackBar.open("AsianetSales updated successfully...","" ,{duration:3000})
        this.clearControls();
        this.dialogRef.close();
      },(error=>{
            alert(error.message)
          }))
    }else if(this.data.type === 'follow'){
      this.editSub = this.adminService.updateAsianetSaleFolowById(this.id, data).subscribe((res)=>{
        this._snackBar.open("AsianetSales updated successfully...","" ,{duration:3000})
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
}
