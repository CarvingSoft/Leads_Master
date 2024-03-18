import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AdminService } from '../../admin.service';
import { Project } from '../../models/project';
import { Status } from '../../models/status';
import { AuthService } from 'src/app/Modules/auth/auth.service';
import { User } from 'src/app/Modules/auth/models/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-hand-over',
  templateUrl: './hand-over.component.html',
  styleUrls: ['./hand-over.component.scss']
})
export class HandOverComponent {
  constructor(private adminService: AdminService, private fb: FormBuilder, private authService: AuthService,
    private _snackBar: MatSnackBar){}

  ngOnDestroy() {
    this.userSub.unsubscribe();
    if(this.proSub){
      this.proSub.unsubscribe();
    }
    if(this.getSub){
      this.getSub.unsubscribe();
    }
    if(this.getProSub){
      this.getProSub.unsubscribe();
    }
    if(this.handOverSub){
      this.handOverSub.unsubscribe();
    }
  }

  handoverForm = this.fb.group({
    type: ['', Validators.required],
    projectId: ['', Validators.required],
    userId: [null, Validators.required],
    assignedToId: ['']
  })

  ngOnInit(){
    this.getProject()
    this.getUsers()
  }

  project$!: Observable<Project[]>
  getProject() {
    this.project$ = this.adminService.getProject()
  }

  cbStatus = {id: 100, status: 'CallBack'}
  allStatus = {id: 200, status: 'All'}
  users: User[] = [];
  userSub!: Subscription;
  getUsers() {
    this.userSub = this.authService.getUser().subscribe(res=>{
      this.users = res
    })
  }

  type = [{type: "Base"}, {type: "FollowUp"}]

  data: any;
  projectName!: string
  base: any[] = [];
  userId!: any
  count!: number
  proSub!: Subscription;
  getSub!: Subscription;
  getProjectBase(){
    this.userId = this.handoverForm.getRawValue().userId
    if(this.handoverForm.getRawValue().type === 'Base'){
      this.proSub = this.adminService.getProjectById(this.handoverForm.getRawValue().projectId).subscribe((res)=>{
        this.projectName = res.projectName.toLowerCase()
        let data: any;
        if(this.projectName === "asianetsales"){
          this.getSub = this.adminService.getAllAsianetSales().subscribe(data =>{
            this.base = data.filter(item => item.teleCaller.id == this.userId && item.status === 1)
            this.count = this.base.length;
          })
        }
        if(this.projectName === "asianetcollections"){
          this.getSub = this.adminService.getAllAsianetCollections().subscribe(data =>{
            this.base = data.filter(item => item.teleCaller.id == this.userId && item.status === 1)
            this.count = this.base.length;
          })
        }
        if(this.projectName === "visales"){
          this.getSub = this.adminService.getAllViSales().subscribe(data =>{
            this.base = data.filter(item => item.teleCaller.id == this.userId && item.status === 1)
            this.count = this.base.length;
          })
        }
        if(this.projectName === "vicollections"){
          this.getSub = this.adminService.getAllViCollections().subscribe(data =>{
            this.base = data.filter(item => item.teleCaller.id == this.userId && item.status === 1)
            this.count = this.base.length;
          })
        }
        if(this.projectName === "bajaj"){
          this.getSub = this.adminService.getAllBajaj().subscribe(data =>{
            this.base = data.filter(item => item.teleCaller.id == this.userId && item.status === 1)
            this.count = this.base.length;
          })
        }
      })
    }
    else{
      this.proSub = this.adminService.getProjectById(this.handoverForm.getRawValue().projectId).subscribe((res)=>{
        this.projectName = res.projectName.toLowerCase()
        let data: any;

        if(this.projectName === "asianetsales"){
          this.getSub = this.adminService.getAllAsianetSalesFollowup().subscribe(data =>{
            this.base = data.filter(item => item.caller.id == this.userId && item.status === 1)
            this.count = this.base.length;
          })
        }
        if(this.projectName === "asianetcollections"){
          this.getSub = this.adminService.getAllAsianetCollectionsFollowup().subscribe(data =>{
            this.base = data.filter(item => item.caller.id == this.userId && item.status === 1)
            this.count = this.base.length;
            this.getProjectBase()
          })
        }
        if(this.projectName === "visales"){
          this.getSub = this.adminService.getAllViSalesFollowup().subscribe(data =>{
            this.base = data.filter(item => item.caller.id == this.userId && item.status === 1)
            this.count = this.base.length;
          })
        }
        if(this.projectName === "vicollections"){
          this.getSub = this.adminService.getAllViCollectionsFollowup().subscribe(data =>{
            this.base = data.filter(item => item.caller.id == this.userId && item.status === 1)
            this.count = this.base.length;
          })
        }
        if(this.projectName === "bajaj"){
          this.getSub = this.adminService.getAllBajajFollowup().subscribe(data =>{
            this.base = data.filter(item => item.caller.id == this.userId && item.status === 1)
            this.count = this.base.length;
          })
        }
      })
    }
  }

  handOverSub!: Subscription;
  getProSub!: Subscription;
  handoverData(){
    if(this.handoverForm.getRawValue().type === 'Base'){
      this.getProSub = this.adminService.getProjectById(this.handoverForm.getRawValue().projectId).subscribe((res)=>{
        this.projectName = res.projectName.toLowerCase()
        let user = {
          Teleby: this.handoverForm.getRawValue().assignedToId
        }

        if(this.projectName === "asianetsales"){
          for(let i = 0; i <this.base.length; i++){
            this.handOverSub = this.adminService.handoverAsianetSales(this.base[i].id, user).subscribe(res=>{})
            this._snackBar.open("Handover successfully...","" ,{duration:3000})
            this.clearControls()
          }
        }
        if(this.projectName === "asianetcollections"){
          for(let i = 0; i <this.base.length; i++){
            this.handOverSub = this.adminService.handoverAsianetCollections(this.base[i].id, user).subscribe(res=>{})
            this._snackBar.open("Handover successfully...","" ,{duration:3000})
              this.clearControls()
          }
        }
        if(this.projectName === "visales"){
          for(let i = 0; i <this.base.length; i++){
            this.handOverSub = this.adminService.handoverVi(this.base[i].id, user).subscribe(res=>{
              this._snackBar.open("Handover successfully...","" ,{duration:3000})
              this.clearControls()
            })
          }
        }
        if(this.projectName === "vicollections"){
          for(let i = 0; i <this.base.length; i++){
            this.handOverSub = this.adminService.handoverViCollections(this.base[i].id, user).subscribe(res=>{
              this._snackBar.open("Handover successfully...","" ,{duration:3000})
              this.clearControls()
            })
          }
        }
        if(this.projectName === "bajaj"){
          for(let i = 0; i <this.base.length; i++){
            this.handOverSub = this.adminService.handoverBajaj(this.base[i].id, user).subscribe(res=>{
              this._snackBar.open("Handover successfully...","" ,{duration:3000})
              this.clearControls()
            })
          }
        }
      })
    }
    else{
      this.getProSub = this.adminService.getProjectById(this.handoverForm.getRawValue().projectId).subscribe((res)=>{
        this.projectName = res.projectName.toLowerCase()
        let user = {
          Teleby: this.handoverForm.getRawValue().assignedToId
        }

        if(this.projectName === "asianetsales"){
          for(let i = 0; i <this.base.length; i++){
            this.handOverSub = this.adminService.handoverAsianetSalesFollowup(this.base[i].id, user).subscribe(res=>{
              this._snackBar.open("Handover successfully...","" ,{duration:3000})
              this.clearControls()
            })
          }
        }
        if(this.projectName === "asianetcollections"){
          for(let i = 0; i <this.base.length; i++){
            this.handOverSub = this.adminService.handoverAsianetCollectionsFollowup(this.base[i].id, user).subscribe(res=>{
              this._snackBar.open("Handover successfully...","" ,{duration:3000})
              this.clearControls()
            })
          }
        }
        if(this.projectName === "visales"){
          for(let i = 0; i <this.base.length; i++){
            this.handOverSub = this.adminService.handoverViFollowup(this.base[i].id, user).subscribe(res=>{
              this._snackBar.open("Handover successfully...","" ,{duration:3000})
              this.clearControls()
            })
          }
        }
        if(this.projectName === "vicollections"){
          for(let i = 0; i <this.base.length; i++){
            this.handOverSub = this.adminService.handoverViCollectionsFollow(this.base[i].id, user).subscribe(res=>{
              this._snackBar.open("Handover successfully...","" ,{duration:3000})
              this.clearControls()
            })
          }
        }
        if(this.projectName === "bajaj"){
          for(let i = 0; i <this.base.length; i++){
            this.handOverSub = this.adminService.handoverBajajFollowup(this.base[i].id, user).subscribe(res=>{
              this._snackBar.open("Handover successfully...","" ,{duration:3000})
              this.clearControls()
            })
          }
        }
      })
    }
  }

  clearControls(){
    this.handoverForm.reset()
    this.handoverForm.setErrors(null)
    Object.keys(this.handoverForm.controls).forEach(key=>{this.handoverForm.get(key)?.setErrors(null)})
  }
}

