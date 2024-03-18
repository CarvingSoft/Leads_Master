import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../../models/project';
import { AdminService } from '../../admin.service';
import { FormBuilder, Validators } from '@angular/forms';
import { TelecallerService } from 'src/app/Modules/telecaller/telecaller.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-export-base',
  templateUrl: './export-base.component.html',
  styleUrls: ['./export-base.component.scss']
})
export class ExportBaseComponent {

  constructor(private adminService: AdminService, private fb: FormBuilder, private tealeCallerService: TelecallerService,
    private _snackBar: MatSnackBar){}

  exportForm = this.fb.group({
    type: ['', Validators.required],
    projectId: ['', Validators.required]
  })

  ngOnInit(){
    this.getProject()
  }

  project$!: Observable<Project[]>
  getProject() {
    this.project$ = this.adminService.getProject()
  }

  type = [{type: "Base"}, {type: "FollowUp"}]
  status = [{type: "RNR"}, {type: "CallBusy"}, {type: "CallBack"},{type: "Answered"}, {type: "All"}]

  bsnl: any[] = [];
  data: any[] = [];
  fileName!: string
  makeExcel(){
    // Get the current date
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];

    if(this.exportForm.getRawValue().type === 'Base'){
      const excludedFields = ['teleCallerId', 'projectId', 'teleCaller', 'project', 'callStatus'];

        this.adminService.getProjectById(this.exportForm.getRawValue().projectId).subscribe((res)=>{
          if(res.projectName.toLowerCase() === 'asianetcollections'){
            // Specify the file name with the current date
            this.fileName = `asianet_collections_base${formattedDate}.csv`;

            this.adminService.getAllAsianetCollections().subscribe(res=>{
              this.data = res.filter(res=>res.status != 1)
              console.log(this.data)

              // Get the headings based on the first client object
              const firstClient = this.data[0];
              const headings = Object.keys(firstClient).filter(key => !excludedFields.includes(key));

              const formattedHeadings = headings.map(heading => `-- ${heading.toUpperCase()} --`);

              // Push the headings to the clientArray
              this.bsnl.push(formattedHeadings);

              // Iterate over each client in the array
              for (let i = 0; i < this.data.length; i++) {
                const client: any = this.data[i];
                const newRow: any = [];

                // Iterate over each property of the client object
                for (let key of headings) {
                  let value = client[key];
                  if(key === 'status'){
                    value = this.data[i].callStatus.status;
                  }
                  newRow.push(value);
                }

                this.bsnl.push(newRow);
              }
              // Generate CSV string
              let csvString = '';
              this.bsnl.forEach((rowItem: any) => {
                rowItem.forEach((colItem: any) => {
                  csvString += colItem + ',';
                });
                csvString += '\r\n';
              });

              // Create a download link for the CSV file
              csvString = 'data:application/csv,' + encodeURIComponent(csvString);
              const link = document.createElement('a');
              link.setAttribute('href', csvString);
              link.setAttribute('download', this.fileName);
              document.body.appendChild(link);
              link.click();
              this._snackBar.open("Exported successfully...","" ,{duration:3000})
              this.bsnl = [];

            })
          }

          else if(res.projectName.toLowerCase() === 'asianetsales'){
            // Specify the file name with the current date
            this.fileName = `asianet_sales_base${formattedDate}.csv`;

            this.adminService.getAllAsianetSales().subscribe(res=>{
              this.data = res.filter(res=>res.status != 1)


              // Get the headings based on the first client object
              const firstClient = this.data[0];
              const headings = Object.keys(firstClient).filter(key => !excludedFields.includes(key));

              const formattedHeadings = headings.map(heading => `-- ${heading.toUpperCase()} --`);

              // Push the headings to the clientArray
              this.bsnl.push(formattedHeadings);

              // Iterate over each client in the array
              for (let i = 0; i < this.data.length; i++) {
                const client: any = this.data[i];
                const newRow: any = [];

                // Iterate over each property of the client object
                for (let key of headings) {
                  let value = client[key];
                  if(key === 'status'){
                    value = this.data[i].callStatus.status;
                  }
                  newRow.push(value);
                }

                this.bsnl.push(newRow);
              }

              // Generate CSV string
              let csvString = '';
              this.bsnl.forEach((rowItem: any) => {
                rowItem.forEach((colItem: any) => {
                  csvString += colItem + ',';
                });
                csvString += '\r\n';
              });

              // Create a download link for the CSV file
              csvString = 'data:application/csv,' + encodeURIComponent(csvString);
              const link = document.createElement('a');
              link.setAttribute('href', csvString);
              link.setAttribute('download', this.fileName);
              document.body.appendChild(link);
              link.click();
              this._snackBar.open("Exported successfully...","" ,{duration:3000})
              this.bsnl = [];

            })
          }

          else if(res.projectName.toLowerCase() === 'bajaj'){
            // Specify the file name with the current date
            this.fileName = `bajaj_base${formattedDate}.csv`;

            this.adminService.getAllBajaj().subscribe(res=>{
              this.data = res.filter(res=>res.status != 1)


              // Get the headings based on the first client object
              const firstClient = this.data[0];
              const headings = Object.keys(firstClient).filter(key => !excludedFields.includes(key));

              const formattedHeadings = headings.map(heading => `-- ${heading.toUpperCase()} --`);

              // Push the headings to the clientArray
              this.bsnl.push(formattedHeadings);

              // Iterate over each client in the array
              for (let i = 0; i < this.data.length; i++) {
                const client: any = this.data[i];
                const newRow: any = [];

                // Iterate over each property of the client object
                for (let key of headings) {
                  let value = client[key];
                  if(key === 'status'){
                    value = this.data[i].callStatus.status;
                  }

                  newRow.push(value);
                }

                this.bsnl.push(newRow);
              }

              // Generate CSV string
              let csvString = '';
              this.bsnl.forEach((rowItem: any) => {
                rowItem.forEach((colItem: any) => {
                  csvString += colItem + ',';
                });
                csvString += '\r\n';
              });

              // Create a download link for the CSV file
              csvString = 'data:application/csv,' + encodeURIComponent(csvString);
              const link = document.createElement('a');
              link.setAttribute('href', csvString);
              link.setAttribute('download', this.fileName);
              document.body.appendChild(link);
              link.click();
              this._snackBar.open("Exported successfully...","" ,{duration:3000})
              this.bsnl = [];

            })
          }

          else if(res.projectName.toLowerCase() === 'visales'){
            // Specify the file name with the current date
            this.fileName = `vi_sales_base${formattedDate}.csv`;

            this.adminService.getAllViSales().subscribe(res=>{
              this.data = res.filter(res=>res.status != 1)


              // Get the headings based on the first client object
              const firstClient = this.data[0];
              const headings = Object.keys(firstClient).filter(key => !excludedFields.includes(key));

              const formattedHeadings = headings.map(heading => `-- ${heading.toUpperCase()} --`);

              // Push the headings to the clientArray
              this.bsnl.push(formattedHeadings);

              // Iterate over each client in the array
              for (let i = 0; i < this.data.length; i++) {
                const client: any = this.data[i];
                const newRow: any = [];

                // Iterate over each property of the client object
                for (let key of headings) {
                  let value = client[key];
                  if(key === 'status'){
                    value = this.data[i].callStatus.status;
                  }
                  newRow.push(value);
                }

                this.bsnl.push(newRow);
              }

              // Generate CSV string
              let csvString = '';
              this.bsnl.forEach((rowItem: any) => {
                rowItem.forEach((colItem: any) => {
                  csvString += colItem + ',';
                });
                csvString += '\r\n';
              });

              // Create a download link for the CSV file
              csvString = 'data:application/csv,' + encodeURIComponent(csvString);
              const link = document.createElement('a');
              link.setAttribute('href', csvString);
              link.setAttribute('download', this.fileName);
              document.body.appendChild(link);
              link.click();
              this._snackBar.open("Exported successfully...","" ,{duration:3000})
              this.bsnl = [];

            })
          }

          else if(res.projectName.toLowerCase() === 'vicollections'){
            // Specify the file name with the current date
            this.fileName = `vi_collections_base${formattedDate}.csv`;

            this.adminService.getAllAsianetCollections().subscribe(res=>{
              this.data = res.filter(res=>res.status != 1)


              // Get the headings based on the first client object
              const firstClient = this.data[0];
              const headings = Object.keys(firstClient).filter(key => !excludedFields.includes(key));

              const formattedHeadings = headings.map(heading => `-- ${heading.toUpperCase()} --`);

              // Push the headings to the clientArray
              this.bsnl.push(formattedHeadings);

              // Iterate over each client in the array
              for (let i = 0; i < this.data.length; i++) {
                const client: any = this.data[i];
                const newRow: any = [];

                // Iterate over each property of the client object
                for (let key of headings) {
                  let value = client[key];
                  if(key === 'status'){
                    value = this.data[i].callStatus.status;
                  }
                  newRow.push(value);
                }

                this.bsnl.push(newRow);
              }

              // Generate CSV string
              let csvString = '';
              this.bsnl.forEach((rowItem: any) => {
                rowItem.forEach((colItem: any) => {
                  csvString += colItem + ',';
                });
                csvString += '\r\n';
              });

              // Create a download link for the CSV file
              csvString = 'data:application/csv,' + encodeURIComponent(csvString);
              const link = document.createElement('a');
              link.setAttribute('href', csvString);
              link.setAttribute('download', this.fileName);
              document.body.appendChild(link);
              link.click();
              this._snackBar.open("Exported successfully...","" ,{duration:3000})
              this.bsnl = [];

            })
          }
        })
    }else{
      const excludedFields = ['teleCallerId', 'projectId', 'teleCaller', 'project'];

      this.adminService.getProjectById(this.exportForm.getRawValue().projectId).subscribe((res)=>{
        if(res.projectName.toLowerCase() === 'asianetcollections'){
          // Specify the file name with the current date
          this.fileName = `asianet_collections_base${formattedDate}.csv`;

          this.adminService.getAllAsianetCollectionsFollowup().subscribe(res=>{
            this.data = res.filter(res=>res.status != 1)


            // Get the headings based on the first client object
            const firstClient = this.data[0];
            const headings = Object.keys(firstClient).filter(key => !excludedFields.includes(key));

            const formattedHeadings = headings.map(heading => `-- ${heading.toUpperCase()} --`);

            // Push the headings to the clientArray
            this.bsnl.push(formattedHeadings);

            // Iterate over each client in the array
            for (let i = 0; i < this.data.length; i++) {
              const client: any = this.data[i];
              const newRow: any = [];

              // Iterate over each property of the client object
              for (let key of headings) {
                let value = client[key];
                if(key === 'status'){
                  value = this.data[i].callStatus.status;
                }
                newRow.push(value);
              }

              this.bsnl.push(newRow);
            }

            // Generate CSV string
            let csvString = '';
            this.bsnl.forEach((rowItem: any) => {
              rowItem.forEach((colItem: any) => {
                csvString += colItem + ',';
              });
              csvString += '\r\n';
            });

            // Create a download link for the CSV file
            csvString = 'data:application/csv,' + encodeURIComponent(csvString);
            const link = document.createElement('a');
            link.setAttribute('href', csvString);
            link.setAttribute('download', this.fileName);
            document.body.appendChild(link);
            link.click();
            this._snackBar.open("Exported successfully...","" ,{duration:3000})
            this.bsnl = [];

          })
        }

        else if(res.projectName.toLowerCase() === 'asianetsales'){
          // Specify the file name with the current date
          this.fileName = `asianet_sales_base${formattedDate}.csv`;

          this.adminService.getAllAsianetSalesFollowup().subscribe(res=>{
            this.data = res.filter(res=>res.status != 1)


            // Get the headings based on the first client object
            const firstClient = this.data[0];
            const headings = Object.keys(firstClient).filter(key => !excludedFields.includes(key));

            const formattedHeadings = headings.map(heading => `-- ${heading.toUpperCase()} --`);

            // Push the headings to the clientArray
            this.bsnl.push(formattedHeadings);

            // Iterate over each client in the array
            for (let i = 0; i < this.data.length; i++) {
              const client: any = this.data[i];
              const newRow: any = [];

              // Iterate over each property of the client object
              for (let key of headings) {
                let value = client[key];
                if(key === 'status'){
                  value = this.data[i].callStatus.status;
                }
                newRow.push(value);
              }

              this.bsnl.push(newRow);
            }

            // Generate CSV string
            let csvString = '';
            this.bsnl.forEach((rowItem: any) => {
              rowItem.forEach((colItem: any) => {
                csvString += colItem + ',';
              });
              csvString += '\r\n';
            });

            // Create a download link for the CSV file
            csvString = 'data:application/csv,' + encodeURIComponent(csvString);
            const link = document.createElement('a');
            link.setAttribute('href', csvString);
            link.setAttribute('download', this.fileName);
            document.body.appendChild(link);
            link.click();
            this._snackBar.open("Exported successfully...","" ,{duration:3000})
            this.bsnl = [];

          })
        }

        else if(res.projectName.toLowerCase() === 'bajaj'){
          // Specify the file name with the current date
          this.fileName = `bajaj_base${formattedDate}.csv`;

          this.adminService.getAllBajajFollowup().subscribe(res=>{
            this.data = res.filter(res=>res.status != 1)


            // Get the headings based on the first client object
            const firstClient = this.data[0];
            const headings = Object.keys(firstClient).filter(key => !excludedFields.includes(key));

            const formattedHeadings = headings.map(heading => `-- ${heading.toUpperCase()} --`);

            // Push the headings to the clientArray
            this.bsnl.push(formattedHeadings);

            // Iterate over each client in the array
            for (let i = 0; i < this.data.length; i++) {
              const client: any = this.data[i];
              const newRow: any = [];

              // Iterate over each property of the client object
              for (let key of headings) {
                let value = client[key];
                if(key === 'status'){
                  value = this.data[i].callStatus.status;
                }
                newRow.push(value);
              }

              this.bsnl.push(newRow);
            }

            // Generate CSV string
            let csvString = '';
            this.bsnl.forEach((rowItem: any) => {
              rowItem.forEach((colItem: any) => {
                csvString += colItem + ',';
              });
              csvString += '\r\n';
            });

            // Create a download link for the CSV file
            csvString = 'data:application/csv,' + encodeURIComponent(csvString);
            const link = document.createElement('a');
            link.setAttribute('href', csvString);
            link.setAttribute('download', this.fileName);
            document.body.appendChild(link);
            link.click();
            this._snackBar.open("Exported successfully...","" ,{duration:3000})
            this.bsnl = [];

          })
        }

        else if(res.projectName.toLowerCase() === 'visales'){
          // Specify the file name with the current date
          this.fileName = `vi_sales_base${formattedDate}.csv`;

          this.adminService.getAllViSalesFollowup().subscribe(res=>{
            this.data = res.filter(res=>res.status != 1)


            // Get the headings based on the first client object
            const firstClient = this.data[0];
            const headings = Object.keys(firstClient).filter(key => !excludedFields.includes(key));

            const formattedHeadings = headings.map(heading => `-- ${heading.toUpperCase()} --`);

            // Push the headings to the clientArray
            this.bsnl.push(formattedHeadings);

            // Iterate over each client in the array
            for (let i = 0; i < this.data.length; i++) {
              const client: any = this.data[i];
              const newRow: any = [];

              // Iterate over each property of the client object
              for (let key of headings) {
                let value = client[key];
                if(key === 'status'){
                  value = this.data[i].callStatus.status;
                }
                newRow.push(value);
              }

              this.bsnl.push(newRow);
            }

            // Generate CSV string
            let csvString = '';
            this.bsnl.forEach((rowItem: any) => {
              rowItem.forEach((colItem: any) => {
                csvString += colItem + ',';
              });
              csvString += '\r\n';
            });

            // Create a download link for the CSV file
            csvString = 'data:application/csv,' + encodeURIComponent(csvString);
            const link = document.createElement('a');
            link.setAttribute('href', csvString);
            link.setAttribute('download', this.fileName);
            document.body.appendChild(link);
            link.click();
            this._snackBar.open("Exported successfully...","" ,{duration:3000})
            this.bsnl = [];

          })
        }

        else if(res.projectName.toLowerCase() === 'vicollections'){
          // Specify the file name with the current date
          this.fileName = `vi_collections_base${formattedDate}.csv`;

          this.adminService.getAllAsianetCollectionsFollowup().subscribe(res=>{
            this.data = res.filter(res=>res.status != 1)


            // Get the headings based on the first client object
            const firstClient = this.data[0];
            const headings = Object.keys(firstClient).filter(key => !excludedFields.includes(key));

            const formattedHeadings = headings.map(heading => `-- ${heading.toUpperCase()} --`);

            // Push the headings to the clientArray
            this.bsnl.push(formattedHeadings);

            // Iterate over each client in the array
            for (let i = 0; i < this.data.length; i++) {
              const client: any = this.data[i];
              const newRow: any = [];

              // Iterate over each property of the client object
              for (let key of headings) {
                let value = client[key];
                if(key === 'status'){
                  value = this.data[i].callStatus.status;
                }
                newRow.push(value);
              }

              this.bsnl.push(newRow);
            }

            // Generate CSV string
            let csvString = '';
            this.bsnl.forEach((rowItem: any) => {
              rowItem.forEach((colItem: any) => {
                csvString += colItem + ',';
              });
              csvString += '\r\n';
            });

            // Create a download link for the CSV file
            csvString = 'data:application/csv,' + encodeURIComponent(csvString);
            const link = document.createElement('a');
            link.setAttribute('href', csvString);
            link.setAttribute('download', this.fileName);
            document.body.appendChild(link);
            link.click();
            this._snackBar.open("Exported successfully...","" ,{duration:3000})
            this.bsnl = [];

          })
        }
      })
    }
    this.clearControls();
  }

  clearControls(){
    this.exportForm.reset()
    this.exportForm.setErrors(null)
    Object.keys(this.exportForm.controls).forEach(key=>{this.exportForm.get(key)?.setErrors(null)})
  }
}
