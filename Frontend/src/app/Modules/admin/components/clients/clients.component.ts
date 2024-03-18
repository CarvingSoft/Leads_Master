import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Modules/auth/auth.service';
import { Role } from 'src/app/Modules/auth/models/role';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { AdminService } from '../../admin.service';
import { Client } from '../../models/client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {

  constructor(private fb: FormBuilder,public adminService: AdminService, private _snackBar: MatSnackBar,
    public dialog: MatDialog, private authService: AuthService){}

  ngOnDestroy() {
    this.getSubscription?.unsubscribe()
    if(this.clientS){
      this.clientS.unsubscribe()
    }
    if(this.deleteSub){
      this.deleteSub.unsubscribe()
    }
    if(this.editSub){
      this.editSub.unsubscribe()
    }
  }

  clientForm = this.fb.group({
    clientName: ['', Validators.required],
    phoneNumber: ['', [Validators.required,  Validators.pattern("^[0-9 +]*$"),Validators.minLength(10),Validators.maxLength(14)]]
  });

  displayedColumns : string[] = ['id','clientName','phoneNumber','manage']

  ngOnInit(): void {
    this.getClients()
  }

  clientS!: Subscription;
  onSubmit(){
    this.clientS = this.adminService.addClient(this.clientForm.getRawValue()).subscribe((res)=>{
      this._snackBar.open("Client added successfully...","" ,{duration:3000})
      this.clearControls()
    },(error=>{
      alert(error)
    }))
  }

  clearControls(){
    this.getClients()
    this.clientForm.reset()
    this.clientForm.setErrors(null)
    Object.keys(this.clientForm.controls).forEach(key=>{this.clientForm.get(key)?.setErrors(null)})
  }

  clients: Client[] = [];
  getSubscription? : Subscription
  getClients(){
    this.getSubscription = this.adminService.getClient().subscribe((res)=>{
      this.clients = res
    })
  }

  deleteSub!: Subscription;
  deleteRole(id : any){
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteSub = this.adminService.deleteClient(id).subscribe((res)=>{
          this.getClients()
          this._snackBar.open("Client deleted successfully...","" ,{duration:3000})
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
    let client: any= this.clients.find(x =>x.id == id)

    //Populate the object by the ID
    let clientName = client.clientName.toString();
    let phoneNumber = client.phoneNumber

    this.clientForm.patchValue({clientName : clientName, phoneNumber : phoneNumber})
    this.roleId = id;
  }

  editSub!: Subscription;
  editFunction(){
    this.isEdit = false;

    let data: any ={
      clientName : this.clientForm.get('clientName')?.value,
      phoneNumber : this.clientForm.get('phoneNumber')?.value
    }

    this.editSub = this.adminService.updateClient(this.roleId, data).subscribe((res)=>{
      this._snackBar.open("Client updated successfully...","" ,{duration:3000})
      this.clearControls();
    },(error=>{
          alert(error.message)
        }))
  }

}

