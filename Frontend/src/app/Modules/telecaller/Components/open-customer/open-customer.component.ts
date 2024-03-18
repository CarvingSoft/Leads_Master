import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { Customer } from '../../Models/customer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/Modules/admin/admin.service';
import { Observable, Subscription } from 'rxjs';
import { TelecallerService } from '../../telecaller.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Status } from 'src/app/Modules/admin/models/status';

@Component({
  selector: 'app-open-customer',
  templateUrl: './open-customer.component.html',
  styleUrls: ['./open-customer.component.scss']
})
export class OpenCustomerComponent {

  ngOnDestroy() {
    this.projetSub.unsubscribe();
    this.statusSub.unsubscribe();
    if(this.statSub){
      this.statSub.unsubscribe();
    }
    if(this.projetSub){
      this.projetSub.unsubscribe();
    }
    if(this.dataSub){
      this.dataSub.unsubscribe();
    }
    if(this.updateSub){
      this.updateSub.unsubscribe();
    }
    if(this.addSub){
      this.addSub.unsubscribe();
    }
    if(this.updateSub){
      this.updateSub.unsubscribe();
    }
    if(this.getStatSub){
      this.getStatSub.unsubscribe();
    }
  }

  id!: number
  projectId!: number
  constructor(public route: ActivatedRoute, private fb: FormBuilder, private adminService: AdminService,
    private teleCallerService: TelecallerService, private _snackBar: MatSnackBar, private router: Router){
    this.id = this.route.snapshot.params['id'];
    this.projectId = route.snapshot.params['projectId'];
  }

  statusForm = this.fb.group({
    statusId: ['', Validators.required],
    remarks: [''],
    freeText: [''],
    action: ['']
  })

  callBackForm = this.fb.group({
    date: ['', Validators.required],
    time: ['', Validators.required],
  })

  data: any
  ngOnInit(){
    this.getProjectId();
    this.getStatus();
  }

  statusV: Status[] = [];
  statusSub!: Subscription;
  getStatus(){
     this.statusSub = this.adminService.getStatus().subscribe(status =>{
      this.statusV = status.filter(x=> x.status != 'Not Called')
     })
  }


  backStat: boolean = false
  statSub!: Subscription;
  status(id: number){
    this.statSub = this.adminService.getStatusById(id).subscribe(s=>{
      if(s.status === 'Call Back'){
        this.backStat = true;
      }
      else{
        this.backStat = false;
      }
    })
  }

  remarksV = [
    {name: 'Will not pay'},
    {name: 'Will pay'},
    {name: 'Paid missing'},
    {name: 'Fully paid'},
    {name: 'Partly paid'},
    {name: 'Wrong Number'},
    {name: 'Call not attending/not connecting'},
  ]

  projectName!: string;
  projetSub!: Subscription;
  customer!: any | undefined
  dataSub?: Subscription;
  getProjectId(){
    this.projetSub = this.adminService.getProjectById(this.projectId).subscribe(data => {
      this.projectName = data.projectName.toLowerCase();

      if(this.projectName == 'asianetsales'){
        this.dataSub = this.teleCallerService.getAsianetSalesById(this.id).subscribe(res=>{
          this.customer = res
        })
      }

      if(this.projectName == 'asianetcollections'){
        this.dataSub = this.teleCallerService.getAsianetById(this.id).subscribe(res=>{
          this.customer = res
        })
      }

      if(this.projectName == 'bajaj'){
        this.dataSub = this.teleCallerService.getBajajById(this.id).subscribe(res=>{
          this.customer = res
        })
      }

      if(this.projectName == 'visales'){
        this.dataSub = this.teleCallerService.getViById(this.id).subscribe(res=>{
          this.customer = res
        })
      }

      if(this.projectName == 'vicollections'){
        this.dataSub = this.teleCallerService.getViCollectionsById(this.id).subscribe(res=>{
          this.customer = res
        })
      }
    })
  }

  nextStatus: boolean = false
  remarks!: any
  getStatSub!: Subscription;
  updateSub!: Subscription;
  getSub!: Subscription;
  addSub!: Subscription;
  onSubmit(){
    let data = {
      status : this.statusForm.get('statusId')?.value,
      remarks : this.statusForm.get('remarks')?.value,
      freeText : this.statusForm.get('freeText')?.value,
      action : this.statusForm.get('action')?.value,
      callTime: Date.now()
    }

    let statData = {
      status : this.statusForm.get('statusId')?.value,
      date: this.callBackForm.get('date')?.value,
      time: this.callBackForm.get('time')?.value,
      callTime: Date.now()
    }
    console.log(data)
    console.log(statData)


    this.getStatSub = this.adminService.getStatusById(this.statusForm.getRawValue().statusId).subscribe(res =>{
      if(this.backStat){

        if(this.projectName === 'asianetcollections'){
          this.updateSub = this.teleCallerService.updateAsianetCallBack(this.id,statData).subscribe(data =>{

            this.getSub = this.teleCallerService.getAsianetById(this.id).subscribe(data =>{

              this.addSub = this.teleCallerService.addAsianetFollowUp(data).subscribe(res=>{
                this.router.navigateByUrl('/telecaller/customers').then(()=>{
                  window.location.reload();
                })
                this._snackBar.open("Response Updated successfully...","" ,{duration:3000})
              })
            })
          })
        }

        if(this.projectName === 'asianetsales'){
          this.updateSub = this.teleCallerService.updateAsianetSalesCallBack(this.id,statData).subscribe(data =>{

            this.getSub = this.teleCallerService.getAsianetSalesById(this.id).subscribe(data =>{

              this.addSub = this.teleCallerService.addAsianetSalesFollowUp(data).subscribe(res=>{
                this.router.navigateByUrl('/telecaller/customers').then(()=>{
                  window.location.reload();
                })
                this._snackBar.open("Response Updated successfully...","" ,{duration:3000})
              })
            })
          })
        }

        if(this.projectName === 'bajaj'){
          this.updateSub = this.teleCallerService.updateBajajCallBack(this.id,statData).subscribe(data =>{

            this.getSub = this.teleCallerService.getBajajById(this.id).subscribe(data =>{

              this.addSub = this.teleCallerService.addBajajFollowUp(data).subscribe(res=>{
                this.router.navigateByUrl('/telecaller/customers').then(()=>{
                  window.location.reload();
                })
                this._snackBar.open("Response Updated successfully...","" ,{duration:3000})
              })
            })
          })
        }

        if(this.projectName === 'visales'){
          this.updateSub = this.teleCallerService.updateViCallBack(this.id,statData).subscribe(data =>{

            this.getSub = this.teleCallerService.getViById(this.id).subscribe(data =>{

              this.addSub = this.teleCallerService.addViFollowUp(data).subscribe(res=>{
                this.router.navigateByUrl('/telecaller/customers').then(()=>{
                  window.location.reload();
                })
                this._snackBar.open("Response Updated successfully...","" ,{duration:3000})
              })
            })
          })
        }

        if(this.projectName === 'vicollections'){
          this.updateSub = this.teleCallerService.updateViCollectionsCallBack(this.id,statData).subscribe(data =>{

            this.getSub = this.teleCallerService.getViCollectionsById(this.id).subscribe(data =>{

              this.addSub = this.teleCallerService.addViCollectionFollowUp(data).subscribe(res=>{
                this.router.navigateByUrl('/telecaller/customers').then(()=>{
                  window.location.reload();
                })
                this._snackBar.open("Response Updated successfully...","" ,{duration:3000})
              })
            })
          })
        }

      }
      else{
        if(this.projectName == 'asianetcollections'){
          this.updateSub = this.teleCallerService.updateAsianetResponse(this.id, data).subscribe(res=>{
            this.router.navigateByUrl('/telecaller/customers').then(()=>{
              window.location.reload();
            })
            this._snackBar.open("Response Updated successfully...","" ,{duration:3000})
          })
        }

        if(this.projectName == 'asianetsales'){
          this.updateSub = this.teleCallerService.updateAsianetSalesResponse(this.id, data).subscribe(res=>{
            this.router.navigateByUrl('/telecaller/customers').then(()=>{
              window.location.reload();
            })
            this._snackBar.open("Response Updated successfully...","" ,{duration:3000})
          })
        }

        if(this.projectName == 'bajaj'){
          this.updateSub = this.teleCallerService.updateBajajResponse(this.id, data).subscribe(res=>{
            this.router.navigateByUrl('/telecaller/customers').then(()=>{
              window.location.reload();
            })
            this._snackBar.open("Response Updated successfully...","" ,{duration:3000})
          })
        }

        if(this.projectName == 'visales'){
          this.updateSub = this.teleCallerService.updateViResponse(this.id, data).subscribe(res=>{
            this.router.navigateByUrl('/telecaller/customers').then(()=>{
              window.location.reload();
            })
            this._snackBar.open("Response Updated successfully...","" ,{duration:3000})
          })
        }

        if(this.projectName == 'vicollections'){
          this.updateSub = this.teleCallerService.updateViCollectionsResponse(this.id, data).subscribe(res=>{
            this.router.navigateByUrl('/telecaller/customers').then(()=>{
              window.location.reload();
            })
            this._snackBar.open("Response Updated successfully...","" ,{duration:3000})
          })
        }
      }

    })
    this.clearControls();


  }


  clearControls(){
    this.statusForm.reset()
    this.statusForm.setErrors(null)
    Object.keys(this.statusForm.controls).forEach(key=>{this.statusForm.get(key)?.setErrors(null)})
  }
}
