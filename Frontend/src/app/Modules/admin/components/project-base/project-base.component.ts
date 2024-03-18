import { Bajaj } from './../../../telecaller/Models/bajaj_base';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { Project } from '../../models/project';
import { AdminService } from '../../admin.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-project-base',
  templateUrl: './project-base.component.html',
  styleUrls: ['./project-base.component.scss']
})
export class ProjectBaseComponent {

  ngOnDestroy(){
    if(this.getSub){
      this.getSub.unsubscribe();
    }
    if(this.proSub){
      this.proSub.unsubscribe();
    }
  }

  constructor(private adminService: AdminService, private fb: FormBuilder, private _snackBar: MatSnackBar){}

  baseForm = this.fb.group({
    projectId: ['', Validators.required],
  })

  ngOnInit(){
    this.getProject()
  }

  selectedFile!: File
  btnStat = false;
  fileUpload(event: any) {
    this.btnStat = true;
    this.selectedFile = event.target.files[0];
  }

  project$!: Observable<Project[]>
  getProject() {
    this.project$ = this.adminService.getProject()
  }

  addProject(){}

  onUpload() {

  }

  percent = 50;
  isUploading = false;
  uploadProgress = 0;
  proSub!: Subscription;
  getSub!: Subscription;
  onSubmit(){
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('imageUrl', this.selectedFile, this.selectedFile.name);

      const projectId = this.baseForm.get('projectId')?.value;

      if (projectId) {
        formData.append('projectId', projectId);
      }

      this.getSub = this.adminService.getProjectById(this.baseForm.get('projectId')?.value).subscribe((res)=>{

        if(res.projectName.toLowerCase() === 'asianetsales'){
          this.isUploading = true;
          // Simulate an upload with a timeout
          setTimeout(() => {
            this.proSub = this.adminService.addAsianetSales(formData).subscribe(event => {
              if (event.type === HttpEventType.UploadProgress) {
                if (event.total) {
                  this.uploadProgress = Math.round((100 * event.loaded) / event.total);
                } else {
                  this.uploadProgress = 0; // Unable to calculate progress without total
                }
              }else if (event.type === HttpEventType.Response) {
                this.isUploading = false;
                this._snackBar.open("File uploaded successfully...","" ,{duration:3000})
                this.clearControls()
              }
            })
          }, 3000);

          // Simulate upload progress update
          const interval = setInterval(() => {
            if (this.uploadProgress < 100) {
              this.uploadProgress += 10;
            } else {
              clearInterval(interval);
            }
          }, 300);

        }

        if(res.projectName.toLowerCase() === 'asianetcollections'){
          this.isUploading = true;
          // Simulate an upload with a timeout
          setTimeout(() => {
            this.proSub = this.adminService.addAsianet(formData).subscribe(event => {
              if (event.type === HttpEventType.UploadProgress) {
                if (event.total) {
                  this.uploadProgress = Math.round((100 * event.loaded) / event.total);
                } else {
                  this.uploadProgress = 0; // Unable to calculate progress without total
                }
              }else if (event.type === HttpEventType.Response) {
                this.isUploading = false;
                this._snackBar.open("File uploaded successfully...","" ,{duration:3000})
                this.clearControls()
              }
            })
          }, 3000);

          // Simulate upload progress update
          const interval = setInterval(() => {
            if (this.uploadProgress < 100) {
              this.uploadProgress += 10;
            } else {
              clearInterval(interval);
            }
          }, 300);


        }

        if(res.projectName.toLowerCase() === 'bajaj'){
          this.isUploading = true;
          // Simulate an upload with a timeout
          setTimeout(() => {
            this.proSub = this.adminService.addBajaj(formData).subscribe(event => {
              if (event.type === HttpEventType.UploadProgress) {
                if (event.total) {
                  this.uploadProgress = Math.round((100 * event.loaded) / event.total);
                } else {
                  this.uploadProgress = 0; // Unable to calculate progress without total
                }
              }else if (event.type === HttpEventType.Response) {
                this.isUploading = false;

                this._snackBar.open("Projects added successfully...","" ,{duration:3000})
                this.clearControls()
              }
            })
          }, 3000);

          // Simulate upload progress update
          const interval = setInterval(() => {
            if (this.uploadProgress < 100) {
              this.uploadProgress += 10;
            } else {
              clearInterval(interval);
            }
          }, 300);


        }

        if(res.projectName.toLowerCase() === 'visales'){
          this.isUploading = true;
          // Simulate an upload with a timeout
          setTimeout(() => {
            this.proSub = this.adminService.addVi(formData).subscribe(event => {
              if (event.type === HttpEventType.UploadProgress) {
                if (event.total) {
                  this.uploadProgress = Math.round((100 * event.loaded) / event.total);
                } else {
                  this.uploadProgress = 0; // Unable to calculate progress without total
                }
              }else if (event.type === HttpEventType.Response) {
                this.isUploading = false;
                this._snackBar.open("Projects added successfully...","" ,{duration:3000})
                this.clearControls()
              }
            })
          }, 3000);

          // Simulate upload progress update
          const interval = setInterval(() => {
            if (this.uploadProgress < 100) {
              this.uploadProgress += 10;
            } else {
              clearInterval(interval);
            }
          }, 300);


        }

        if(res.projectName.toLowerCase() === 'vicollections'){
          this.isUploading = true;
          // Simulate an upload with a timeout
          setTimeout(() => {
            this.proSub = this.adminService.addViCollections(formData).subscribe(event => {
              if (event.type === HttpEventType.UploadProgress) {
                if (event.total) {
                  this.uploadProgress = Math.round((100 * event.loaded) / event.total);
                } else {
                  this.uploadProgress = 0; // Unable to calculate progress without total
                }
              }else if (event.type === HttpEventType.Response) {
                this.isUploading = false;
                this._snackBar.open("Projects added successfully...","" ,{duration:3000})
                this.clearControls()
              }
            })
          }, 3000);

          // Simulate upload progress update
          const interval = setInterval(() => {
            if (this.uploadProgress < 100) {
              this.uploadProgress += 10;
            } else {
              clearInterval(interval);
            }
          }, 300);


        }
      })
    }

  }

  clearControls(){
    // this.getProjects()
    this.baseForm.reset()
    this.baseForm.setErrors(null)
    Object.keys(this.baseForm.controls).forEach(key=>{this.baseForm.get(key)?.setErrors(null)})
  }
}
