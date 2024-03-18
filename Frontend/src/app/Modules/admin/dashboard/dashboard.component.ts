import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { TelecallerService } from '../../telecaller/telecaller.service';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  ngOnDestroy() {
    // this.bsnlSub.unsubscribe();
    this.asianetSub.unsubscribe();
    this.asianetSalSub.unsubscribe();
    this.asianetSalSubF.unsubscribe();
    this.asianetSubF.unsubscribe();

    this.bajajSub.unsubscribe();
    this.bajajSubF.unsubscribe();

    this.viSub.unsubscribe();
    this.viCollSub.unsubscribe();
    this.viCollSubF.unsubscribe();
    this.viSubF.unsubscribe();
  }

  date: any;
  constructor(private telecallerService: TelecallerService, private datePipe: DatePipe, private adminService: AdminService){
    this.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  ngOnInit() {
    this.getCompletedCalls();
    this.getFollowupCalls();
  }

  asianetSub!: Subscription;
  asianetSalSub!: Subscription;
  bajajSub!: Subscription;
  viSub!: Subscription;
  viCollSub!: Subscription;
  comCall!: number;
  pendCall!: number;
  data: any[] = [];
  getCompletedCalls(){
    // this.bsnlSub = this.telecallerService.getBsnlCaller().subscribe(data =>{
    //   let bsnl = data

      this.asianetSalSub = this.adminService.getAllAsianetSales().subscribe(data =>{
        let asianet = data

        this.bajajSub = this.adminService.getAllBajaj().subscribe(data =>{
          let bajaj = data

          this.viCollSub = this.adminService.getAllViCollections().subscribe(data =>{
            let vi = data

            this.asianetSub = this.adminService.getAllAsianetCollections().subscribe(data =>{
              let asianetColl = data

              this.viSub = this.adminService.getAllViSales().subscribe(data =>{
                let viSale = data

                this.data = [ ...asianet, ...bajaj, ...vi, ...asianetColl, ...viSale];

                this.comCall = this.data.filter(x => x.status != 1).length
                this.pendCall = this.data.filter(x => x.status === 1).length
              // })
            })
          })
        })
      })
    })
  }

  asianetSubF!: Subscription;
  asianetSalSubF!: Subscription;
  bajajSubF!: Subscription;
  viSubF!: Subscription;
  viCollSubF!: Subscription;
  comCallF!: number;
  pendCallF!: number;
  follow: any[] = [];
  followCount!: number
  todayCount!: number
  getFollowupCalls(){
    // this.telecallerService.getFollowUpCaller().subscribe(data =>{
    //   let bsnlFollow = data

      this.asianetSalSubF = this.adminService.getAllAsianetSalesFollowup().subscribe(data =>{
        let asianetFollow = data;

        this.bajajSubF = this.adminService.getAllBajajFollowup().subscribe(data =>{
          let bajajFollow = data;

          this.viCollSubF = this.adminService.getAllViCollectionsFollowup().subscribe(data =>{
            let viFollow = data;

            this.asianetSubF = this.adminService.getAllAsianetCollectionsFollowup().subscribe(data =>{
              let asianetColl = data;

              this.viSubF = this.adminService.getAllViSalesFollowup().subscribe(data =>{
                let viSale = data;

                this.follow = [ ...asianetFollow, ...viFollow, ...bajajFollow, ...asianetColl, ...viSale]
                this.followCount = this.follow.filter(x => x.status != 1).length
                this.todayCount = this.follow.filter(x => x.status === 1 && x.date === this.date).length

              // })
            })
          })
        })
      })
    })
  }

}
