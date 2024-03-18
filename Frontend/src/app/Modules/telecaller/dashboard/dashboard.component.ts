import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { TelecallerService } from '../telecaller.service';
import { DatePipe } from '@angular/common';
import { AdminService } from '../../admin/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  ngOnDestroy() {
    // this.bsnlSub.unsubscribe();
    // this.asianetSub.unsubscribe();
    // this.bajajSub.unsubscribe();
    // this.viSub.unsubscribe();
  }

  userId: number;
  date: any;
  constructor(private telecallerService: TelecallerService, private datePipe: DatePipe, private adminService: AdminService){
    const token: any = localStorage.getItem('token')
      let user = JSON.parse(token)
      this.userId = user.id

      this.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  ngOnInit() {
    this.getCompletedCalls();
    this.getFollowupCalls();
  }

  bsnlSub!: Subscription;
  asianetSub!: Subscription;
  bajajSub!: Subscription;
  viSub!: Subscription;
  comCall!: number;
  pendCall!: number;
  data: any[] = [];
  getCompletedCalls(){
    // this.bsnlSub = this.telecallerService.getBsnlCaller().subscribe(data =>{
    //   let bsnl = data.filter(x=>x.teleCallerId === this.userId)

      this.asianetSub = this.adminService.getAllAsianetSales().subscribe(data =>{
        let asianet = data.filter(x=>x.teleCaller.id === this.userId)

        this.bajajSub = this.adminService.getAllBajaj().subscribe(data =>{
          let bajaj = data.filter(x=>x.teleCaller.id === this.userId)

          this.viSub = this.adminService.getAllViCollections().subscribe(data =>{
            let vi = data.filter(x=>x.teleCaller.id === this.userId)

            this.asianetSub = this.adminService.getAllAsianetCollections().subscribe(data =>{
              let asianetColl = data.filter(x=>x.teleCaller.id === this.userId)

              this.asianetSub = this.adminService.getAllViSales().subscribe(data =>{
                let viSale = data.filter(x=>x.teleCaller.id === this.userId)

                this.data = [...asianet, ...bajaj, ...vi, ...asianetColl, ...viSale];
                this.comCall = this.data.filter(x => x.status != 1).length
                this.pendCall = this.data.filter(x => x.status === 1).length
              // })
            })
          })
        })
      })
    })
  }

  follow: any[] = [];
  followCount!: number
  todayCount!: number
  getFollowupCalls(){
    // this.telecallerService.getFollowUpCaller().subscribe(data =>{
    //   let bsnlFollow = data.filter(x=>x.caller.id === this.userId)

      this.adminService.getAllAsianetSalesFollowup().subscribe(data =>{
        let asianetFollow = data.filter(x=>x.caller.id === this.userId)

        this.adminService.getAllBajajFollowup().subscribe(data =>{
          let bajajFollow = data.filter(x=>x.caller.id === this.userId)

          this.adminService.getAllViCollectionsFollowup().subscribe(data =>{
            let viFollow = data.filter(x=>x.caller.id === this.userId)

            this.adminService.getAllAsianetCollectionsFollowup().subscribe(data =>{
              let asianetColl = data.filter(x=>x.caller.id === this.userId)

              this.adminService.getAllViSalesFollowup().subscribe(data =>{
                let viSale = data.filter(x=>x.caller.id === this.userId)

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
