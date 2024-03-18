import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Modules/auth/auth.service';
import { ViCollection } from 'src/app/Modules/telecaller/Models/vi_collection_base';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { AdminService } from '../../../admin.service';
import { Vi } from 'src/app/Modules/telecaller/Models/vi_base';

@Component({
  selector: 'app-vi-sales',
  templateUrl: './vi-sales.component.html',
  styleUrls: ['./vi-sales.component.scss']
})
export class ViSalesComponent {
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
    mobileNumber: [''],
    custName: [''],
    campionName: [''],
    currentPlan: [''],
    noOfConnections: [''],
    pinCode: [''],
    suggestedPlan: [''],
    status: [''],
    remarks: [''],
    freeText: [''],
    action: [''],
    Teleby: ['']
  });

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

        //Populate the object by the ID
        let mobileNumber = this.base.mobileNumber?.toString();
        let custName = this.base.custName?.toString();
        let campionName = this.base.campionName?.toString();
        let currentPlan = this.base.currentPlan?.toString();
        let noOfConnections = this.base.noOfConnections?.toString();
        let pinCode = this.base.pinCode?.toString();
        let suggestedPlan = this.base.suggestedPlan?.toString();
        let status = this.base.status?.toString();
        let remarks = this.base.remarks?.toString();
        let freeText = this.base.freeText?.toString();
        let action = this.base.action?.toString();
        this.editForm.patchValue({
          mobileNumber : mobileNumber,
          custName : custName,
          campionName : campionName,
          currentPlan : currentPlan,
          noOfConnections : noOfConnections,
          pinCode : pinCode,
          suggestedPlan : suggestedPlan,
          status : status,
          remarks : remarks,
          freeText : freeText,
          action : action
        })
      })
    }else if(this.data.type === 'follow'){
      this.baseSub = this.adminService.getViFollowById(this.id).subscribe(data => {
        this.base = data
        //Populate the object by the ID
        let mobileNumber = this.base.mobileNumber?.toString();
        let custName = this.base.custName?.toString();
        let campionName = this.base.campionName?.toString();
        let currentPlan = this.base.currentPlan?.toString();
        let noOfConnections = this.base.noOfConnections?.toString();
        let pinCode = this.base.pinCode?.toString();
        let suggestedPlan = this.base.suggestedPlan?.toString();
        let status = this.base.status?.toString();
        let remarks = this.base.remarks?.toString();
        let freeText = this.base.freeText?.toString();
        let action = this.base.action?.toString();
        this.editForm.patchValue({
          mobileNumber : mobileNumber,
          custName : custName,
          campionName : campionName,
          currentPlan : currentPlan,
          noOfConnections : noOfConnections,
          pinCode : pinCode,
          suggestedPlan : suggestedPlan,
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
      mobileNumber : this.editForm.get('mobileNumber')?.value,
      custName : this.editForm.get('custName')?.value,
      campionName : this.editForm.get('campionName')?.value,
      currentPlan : this.editForm.get('currentPlan')?.value,
      noOfConnections : this.editForm.get('noOfConnections')?.value,
      pinCode : this.editForm.get('pinCode')?.value,
      suggestedPlan : this.editForm.get('suggestedPlan')?.value,
      status : this.editForm.get('status')?.value,
      remarks : this.editForm.get('remarks')?.value,
      freeText : this.editForm.get('freeText')?.value,
      action : this.editForm.get('action')?.value
    }

    if(this.data.type === 'base'){
      this.editSub = this.adminService.updateViById(this.id, data).subscribe((res)=>{
        this._snackBar.open("ViSales updated successfully...","" ,{duration:3000})
        this.clearControls();
        this.dialogRef.close();
      },(error=>{
            alert(error.message)
          }))
    }else if(this.data.type === 'follow'){
      this.editSub = this.adminService.updateViFollowById(this.id, data).subscribe((res)=>{
        this._snackBar.open("ViSales updated successfully...","" ,{duration:3000})
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
