import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import * as XLSX from 'xlsx';

@Component({
  selector: 'app-upload-excel',
  templateUrl: './upload-excel.component.html',
  styleUrls: ['./upload-excel.component.scss']
})
export class UploadExcelComponent {

  constructor(private dialogRef: MatDialogRef<UploadExcelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){}

  selectedFile!: File
  fileUpload(event: any) {
    this.selectedFile = event.target.files[0];
    this.dialogRef.close(this.selectedFile);
  }

}
