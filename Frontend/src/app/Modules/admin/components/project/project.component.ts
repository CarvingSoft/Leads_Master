import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/Modules/auth/auth.service';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { AdminService } from '../../admin.service';
import { Client } from '../../models/client';
import { User } from 'src/app/Modules/auth/models/user';
import { ProjectType } from '../../models/projectType';
import { Project } from '../../models/project';
import { Router } from '@angular/router';
import { UploadExcelComponent } from '../upload-excel/upload-excel.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {

  constructor(private fb: FormBuilder,public adminService: AdminService, private _snackBar: MatSnackBar,
    public dialog: MatDialog, private authService: AuthService, private router: Router){}

  ngOnDestroy() {
    this.projectsubscription?.unsubscribe()
  }

  projectForm = this.fb.group({
    startDate: [''],
    projectName: ['', Validators.required],
    description: [''],
    endDate: [''],
    clientId: [''],
    teamLeadId: [''],
    imageUrl: [''],
    projectTypeId: ['', Validators.required]
  });

  displayedColumns : string[] = ['id','projectsName','description', 'startDate', 'endDate', 'clientId', 'teamLeadId', 'projectTypeId','manage']

  ngOnInit(): void {
    this.getProjects();
    this.getClients();
    this.getLeader();
    this.getProjectType()
  }

  client$!: Observable<Client[]>
  getClients(){
    this.client$ = this.adminService.getClient()
  }

  user$!: Observable<User[]>
  getLeader(){
    this.user$ = this.authService.getUser()
  }

  project$!: Observable<ProjectType[]>
  getProjectType(){
    this.project$ = this.adminService.getProjectType()
  }

  addClient(){}

  addUser(){}

  addProject(){}

  imageUrl!: File
  uploadExcel(){
    const dialogRef = this.dialog.open(UploadExcelComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.imageUrl = result
    })
    // this.router.navigateByUrl('admin/upload')
  }

  onSubmit(){
    const data = new FormData();
    const description = this.projectForm.get('description')?.value;
    if (description) {
      data.append('description', description);
    }

    const projectName = this.projectForm.get('projectName')?.value;
    if (projectName) {
      data.append('projectName', projectName);
    }

    const startDate = this.projectForm.get('startDate')?.value;
    if (startDate) {
      data.append('startDate', startDate);
    }

    const teamLeadId = this.projectForm.get('teamLeadId')?.value;
    if (teamLeadId) {
      data.append('teamLeadId', teamLeadId);
    }

    const projectTypeId = this.projectForm.get('projectTypeId')?.value;
    if (projectTypeId) {
      data.append('projectTypeId', projectTypeId);
    }

    const clientId = this.projectForm.get('clientId')?.value;
    if (clientId) {
      data.append('clientId', clientId);
    }

    const endDate = this.projectForm.get('endDate')?.value;
    if (endDate) {
      data.append('endDate', endDate);
    }

    if (this.imageUrl) {
      data.append('imageUrl', this.imageUrl, 'projectImage.jpg');
    }


    this.adminService.addProject(data).subscribe((res)=>{
      this._snackBar.open("Projects added successfully...","" ,{duration:3000})
      this.clearControls()
    },(error=>{
      alert(error)
    }))
  }

  clearControls(){
    this.getProjects()
    this.projectForm.reset()
    this.projectForm.setErrors(null)
    Object.keys(this.projectForm.controls).forEach(key=>{this.projectForm.get(key)?.setErrors(null)})
  }

  projects: Project[] = [];
  projectsubscription? : Subscription
  getProjects(){
    this.projectsubscription = this.adminService.getProject().subscribe((res)=>{
      this.projects = res
    })
  }

  deleteProjects(id : any){
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.adminService.deleteProject(id).subscribe((res)=>{
          this.getProjects()
          this._snackBar.open("Project deleted successfully...","" ,{duration:3000})
        },(error=>{
          this._snackBar.open(error.error.message,"" ,{duration:3000})
        }))
      }
    })
  }

  isEdit = false;
  projectId : any;
  editProjects(id : any){
    this.isEdit = true;
    //Get the product based on the ID
    let projects: any= this.projects.find(x =>x.id == id)

    //Populate the object by the ID
    let projectName = projects.projectName.toString();
    let description = projects.description.toString()
    let startDate = projects.startDate
    let endDate = projects.endDate
    let clientId = projects.clientId;
    let teamLeadId = projects.teamLeadId;
    let projectTypeId = projects.projectTypeId;

    this.projectForm.patchValue({
      projectName : projectName,
      description : description,
      startDate : startDate,
      endDate : endDate,
      clientId : clientId,
      teamLeadId : teamLeadId,
      projectTypeId : projectTypeId
    })
    this.projectId = id;
  }

  editFunction(){
    this.isEdit = false;

    let data: any ={
      projectName : this.projectForm.get('projectName')?.value,
      description : this.projectForm.get('description')?.value,
      startDate : this.projectForm.get('startDate')?.value,
      endDate : this.projectForm.get('endDate')?.value,
      clientId : this.projectForm.get('clientId')?.value,
      teamLeadId : this.projectForm.get('teamLeadId')?.value,
      projectTypeId : this.projectForm.get('projectTypeId')?.value
    }
    this.adminService.updateProject(this.projectId, data).subscribe((res)=>{
      this._snackBar.open("Projects updated successfully...","" ,{duration:3000})
      this.getProjects();
      this.clearControls();
    },(error=>{
          alert(error.message)
        }))
  }



}
