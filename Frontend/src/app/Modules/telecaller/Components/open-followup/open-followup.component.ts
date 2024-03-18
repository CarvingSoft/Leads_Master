import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AdminService } from 'src/app/Modules/admin/admin.service';
import { TelecallerService } from '../../telecaller.service';
import { Status } from 'src/app/Modules/admin/models/status';

@Component({
  selector: 'app-open-followup',
  templateUrl: './open-followup.component.html',
  styleUrls: ['./open-followup.component.scss']
})
export class OpenFollowupComponent {
  ngOnDestroy() {
    this.projetSub.unsubscribe();
    if(this.statSub){
      this.statSub.unsubscribe();
    }
    this.dataSub?.unsubscribe();
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
    if(this.getSub){
      this.getSub.unsubscribe();
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
    statusId: [''],
    date: [''],
    time: [''],
    remarks: [''],
    freeText: [''],
    action: ['']
  })

  data: any
  ngOnInit(){
    this.getProjectId()
    this.getStatus()
  }

  status$!: Observable<Status[]>
  getStatus(){
    this.status$ = this.adminService.getStatus()
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


  projectName!: string;
  projetSub!: Subscription;
  customer!: any | undefined
  dataSub?: Subscription;
  getProjectId(){
    this.projetSub = this.adminService.getProjectById(this.projectId).subscribe(data => {
      this.projectName = data.projectName.toLowerCase();
      if(this.projectName == 'asianetsales'){
        this.dataSub = this.teleCallerService.getAsianetSalesFollowUpById(this.id).subscribe(res=>{
          this.customer = res
        })
      }

      if(this.projectName == 'asianetcollections'){
        this.dataSub = this.teleCallerService.getAsianetFollowUpById(this.id).subscribe(res=>{
          this.customer = res
        })
      }

      if(this.projectName == 'bajaj'){
        this.dataSub = this.teleCallerService.getBajajFollowUpById(this.id).subscribe(res=>{
          this.customer = res
        })
      }

      if(this.projectName == 'visales'){
        this.dataSub = this.teleCallerService.getViFollowUpById(this.id).subscribe(res=>{
          this.customer = res
        })
      }

      if(this.projectName == 'vicollections'){
        this.dataSub = this.teleCallerService.getViCollectionFollowUpById(this.id).subscribe(res=>{
          this.customer = res
        })
      }
    })
  }

  nextStatus: boolean = false
  remarks!: any
  getStatSub!: Subscription;
  updateSub!: Subscription;
  addSub!: Subscription;
  getSub!: Subscription;
  onSubmit(){
    let data = {
      status : this.statusForm.get('statusId')?.value,
      remarks : this.statusForm.get('remarks')?.value,
      freeText : this.statusForm.get('freeText')?.value,
      action : this.statusForm.get('action')?.value,
      callTime: Date.now()
    }

    let statData = {
      status : 'CallBack',
      date: this.statusForm.get('date')?.value,
      time: this.statusForm.get('time')?.value,
      callTime: Date.now()
    }


    this.getStatSub = this.adminService.getStatusById(this.statusForm.getRawValue().statusId).subscribe(res =>{
      if(this.backStat){
        if(this.projectName === 'asianetcollections'){
          this.updateSub = this.teleCallerService.updateAsianetFollowupCallBack(this.id,statData).subscribe(data =>{

            this.getSub = this.teleCallerService.getAsianetFollowUpById(this.id).subscribe(data =>{

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

            this.getSub = this.teleCallerService.getAsianetSalesFollowUpById(this.id).subscribe(data =>{

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
          this.updateSub = this.teleCallerService.updateBajajFollowupCallBack(this.id,statData).subscribe(data =>{

            this.getSub = this.teleCallerService.getBajajFollowUpById(this.id).subscribe(data =>{

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
          this.updateSub = this.teleCallerService.updateViFollowupCallBack(this.id,statData).subscribe(data =>{

            this.getSub = this.teleCallerService.getViFollowUpById(this.id).subscribe(data =>{

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
          this.updateSub = this.teleCallerService.updateViFollowupCallBack(this.id,statData).subscribe(data =>{

            this.getSub = this.teleCallerService.getViCollectionFollowUpById(this.id).subscribe(data =>{

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
          this.updateSub = this.teleCallerService.updateAsianetFollowupResponse(this.id, data).subscribe(res=>{
            this.router.navigateByUrl('/telecaller/customers').then(()=>{
              window.location.reload();
            })
            this._snackBar.open("Response Updated successfully...","" ,{duration:3000})
          })
        }

        if(this.projectName == 'asianetsales'){
          this.updateSub = this.teleCallerService.updateAsianetSalesFollowupResponse(this.id, data).subscribe(res=>{
            this.router.navigateByUrl('/telecaller/customers').then(()=>{
              window.location.reload();
            })
            this._snackBar.open("Response Updated successfully...","" ,{duration:3000})
          })
        }

        if(this.projectName == 'bajaj'){
          this.updateSub = this.teleCallerService.updateBajajFollowupResponse(this.id, data).subscribe(res=>{
            this.router.navigateByUrl('/telecaller/customers').then(()=>{
              window.location.reload();
            })
            this._snackBar.open("Response Updated successfully...","" ,{duration:3000})
          })
        }

        if(this.projectName == 'visales'){
          this.updateSub = this.teleCallerService.updateViFollowupResponse(this.id, data).subscribe(res=>{
            this.router.navigateByUrl('/telecaller/customers').then(()=>{
              window.location.reload();
            })
            this._snackBar.open("Response Updated successfully...","" ,{duration:3000})
          })
        }

        if(this.projectName == 'vicollections'){
          this.updateSub = this.teleCallerService.updateViCollectionFollowupResponse(this.id, data).subscribe(res=>{
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
