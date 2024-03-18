import { Subscription } from 'rxjs';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Modules/auth/auth.service';
import { TelecallerService } from '../../telecaller.service';
import { AsianetFollowup } from '../../Models/asianet_followup';
import { BajajFollowup } from '../../Models/bajaj_followup';
import { ViFollowup } from '../../Models/vi_followup';
import { DatePipe } from '@angular/common';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AsianetSaleFollowup } from '../../Models/asianet_sales_followup';
import { ViCollectionFollowup } from '../../Models/vi_collection_followup';
import { AdminService } from 'src/app/Modules/admin/admin.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})

export class CustomerComponent {
  pageSize = 10;
  pageIndex = 0;
  paginatedData: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  onPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    this.paginatedData = this.data.slice(startIndex, startIndex + event.pageSize);
  }

  userId!: number
  date!: any
  constructor(private router: Router, private authService: AuthService, private teleCallerService: TelecallerService,
    private datePipe: DatePipe, private adminService: AdminService){
    const token: any = localStorage.getItem('token')
      let user = JSON.parse(token)
      this.userId = user.id

      this.date = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
  }

  ngOnInit() {
    this.getFollowUp()
    this.getData();
  }

  bsnlSub!: Subscription;
  asianetSub!: Subscription;
  bajajSub!: Subscription;
  viSub!: Subscription;
  comCall!: number;
  pendCall!: number;
  data: any[] = [];
  getData(){
    this.asianetSub = this.adminService.getAllAsianetSales().subscribe(data =>{
      let asianet = data.filter(x=>x.teleCaller.id === this.userId && x.callStatus.id === 1)

      this.bajajSub = this.adminService.getAllBajaj().subscribe(data =>{
        let bajaj = data.filter(x=>x.teleCaller.id === this.userId && x.callStatus.id === 1)

        this.viSub = this.adminService.getAllViCollections().subscribe(data =>{
          let vi = data.filter(x=>x.teleCaller.id === this.userId && x.callStatus.id === 1)

          this.asianetSub = this.adminService.getAllAsianetCollections().subscribe(data =>{
            let asianetColl = data.filter(x=>x.teleCaller.id === this.userId && x.callStatus.id === 1)

            this.asianetSub = this.adminService.getAllViSales().subscribe(data =>{
              let viSale = data.filter(x=>x.teleCaller.id === this.userId && x.callStatus.id === 1)

              this.data = [...asianet, ...bajaj, ...vi, ...asianetColl, ...viSale];

                this.paginatedData = this.data.slice(0, this.pageSize);
              // })
            })
          })
        })
      })
    })
  }

  followSub!: Subscription
  asianetFollow: AsianetFollowup[] = [];
  bajajFollow: BajajFollowup[] = [];
  viFollow: ViFollowup[] = [];
  asianetSaleFollow: AsianetSaleFollowup[] = [];
  viCollectionFollow: ViCollectionFollowup[] = [];
  follow: any[] = [];
  getFollowUp(){
    // this.teleCallerService.getFollowUpCaller().subscribe(data =>{
    //   this.bsnlFollow = data.filter(x=> this.datePipe.transform(x.date, 'dd/MM/yyyy') === this.date && x.status === null && x.caller.id === this.userId);
    //   (this.bsnlFollow);

          this.adminService.getAllAsianetSalesFollowup().subscribe(data =>{
            let asianetFollow = data.filter(x=> this.datePipe.transform(x.date, 'dd/MM/yyyy') === this.date && x.callStatus.id === 1  && x.caller.id === this.userId);

            this.adminService.getAllBajajFollowup().subscribe(data =>{
              let bajajFollow = data.filter(x=> this.datePipe.transform(x.date, 'dd/MM/yyyy') === this.date && x.callStatus.id === 1  && x.caller.id === this.userId);

              this.adminService.getAllViCollectionsFollowup().subscribe(data =>{
                let viFollow = data.filter(x=> this.datePipe.transform(x.date, 'dd/MM/yyyy') === this.date && x.callStatus.id === 1  && x.caller.id === this.userId);

                this.adminService.getAllAsianetCollectionsFollowup().subscribe(data =>{
                  let asianetColl = data.filter(x=> this.datePipe.transform(x.date, 'dd/MM/yyyy') === this.date && x.callStatus.id === 1  && x.caller.id === this.userId);

                  this.adminService.getAllViSalesFollowup().subscribe(data =>{
                    let viSale = data.filter(x=> this.datePipe.transform(x.date, 'dd/MM/yyyy') === this.date && x.callStatus.id === 1  && x.caller.id === this.userId);

                    this.follow = [ ...asianetFollow, ...viFollow, ...bajajFollow, ...asianetColl, ...viSale]
            })
          })
        })
      })
    })
  }

  openCustomer(id: number, projectId: number){
    this.router.navigateByUrl('/telecaller/customers/open/'+ id + '/' + projectId)
  }

  openCustomerFollowup(id: number, projectId: number){
    this.router.navigateByUrl('/telecaller/followupcustomers/open/'+ id + '/' + projectId)
  }
}
