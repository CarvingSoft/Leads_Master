import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/Modules/admin/admin.service';
import { EventInput, CalendarOptions, Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { MatDialog } from '@angular/material/dialog';
import { ReportDialogueComponent } from '../report-dialogue/report-dialogue.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {

  @ViewChild('fullcalendar', { static: true }) fullcalendar: any;

  ngOnDestroy() {};

  ngAfterViewInit() {
    this.getDisplayedMonthAndYear()
  }

  calendarEvents: EventInput[] = [];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: this.calendarEvents, // Placeholder for initial events
    eventDidMount: this.eventDidMount,
    // displayEventTime: false,
    // eventClick: (info) => {
    //   this.openEventDialog(info.event);
    // }
  };

  openEventDialog(eventData: any): void {
    let pass = eventData._def.title.replace(/: \d+/, '');
    let date = eventData._instance.range.start;
    const dialogRef = this.dialog.open(ReportDialogueComponent, {
      data: {
        status: pass, date: date
      },
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle the result when the dialog is closed
      console.log(`Dialog result: ${result}`);
    });
  }

  eventDidMount(info: any) {
    // Customize the background color of the event
    info.el.style.backgroundColor = info.event.backgroundColor;
    info.el.style.borderColor = info.event.borderColor;
    info.el.style.color = info.event.color;
  }


  month!: number;
  year!: number;
  getDisplayedMonthAndYear() {
    const fullCalendarApi = this.fullcalendar.getApi();
    const updateMonthAndYear = () => {
      this.calendarEvents = [];
      const currentView = fullCalendarApi.currentData.viewTitle;
      console.log(currentView);
      const date = new Date(currentView);
      this.month = date.getMonth() + 1;
      this.year = date.getFullYear();

      this.getCompletedCalls()
      this.getFollowupCalls()
    };
    updateMonthAndYear();
    fullCalendarApi.on('datesSet', updateMonthAndYear);
  }

  date!: any;
  currentMonth!: any;
  constructor(private adminService: AdminService, private datePipe: DatePipe, private dialog: MatDialog) {
    this.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

    const currentDate = new Date();
    this.currentMonth  = currentDate.toISOString().slice(0, 7);
  };

  ngOnInit() {};

  bsnlSub!: Subscription;
  asianetSub!: Subscription;
  bajajSub!: Subscription;
  viSub!: Subscription;
  comCall!: number;
  pendCall!: number;
  data: any[] = [];
  assignedToday!: number;
  assignedMonth!: number;
  comCallMonth!: number;
  getCompletedCalls(){
    // this.bsnlSub = this.telecallerService.getBsnlCaller().subscribe(data =>{
    //   let bsnl = data.filter(x=>x.teleCallerId === this.userId)

      this.asianetSub = this.adminService.getAllAsianetSales().subscribe(data =>{
        let asianet = data.filter(a=> a.status != 1)

        this.bajajSub = this.adminService.getAllBajaj().subscribe(data =>{
          let bajaj = data.filter(a=> a.status != 1)

          this.viSub = this.adminService.getAllViCollections().subscribe(data =>{
            let vi = data.filter(a=> a.status != 1)

            this.asianetSub = this.adminService.getAllAsianetCollections().subscribe(data =>{
              let asianetColl = data.filter(a=> a.status != 1)

              this.asianetSub = this.adminService.getAllViSales().subscribe(data =>{
                let viSale = data.filter(a=> a.status != 1)

                this.data = [...asianet, ...bajaj, ...vi, ...asianetColl, ...viSale];
                console.log(this.data)
                const comCallByDate: any = {};

                // Iterate through the assessments and count them for each date
                this.data.forEach(x => {
                  const date = new Date(x.callTime).toISOString().substr(0, 10);
                  console.log(date)// Extract the date part
                    if (comCallByDate[date]) {
                      comCallByDate[date]++;
                    } else {
                      comCallByDate[date] = 1;
                    }
                    const assessmentEvents = Object.keys(comCallByDate).map(dateString => ({
                      title: `Completed: ${comCallByDate[dateString]}`,
                      start: dateString,
                      backgroundColor: 'green',
                      borderColor: 'white',
                      color: 'white'
                    }))


                  this.calendarEvents = this.calendarEvents.concat(assessmentEvents);
                  this.renderCalendarEvents();
                });
              // })
            })
          }, error => {
            console.error('Error fetching data :', error);
          })
        })
      })
    })
  }

  follow: any[] = [];
  followCount!: number
  todayCount!: number
  todayComCount!: number;
  followCountMonth!: number;
  pendingCount!: number;
  monthComCount!: number;
  getFollowupCalls(){
    // this.telecallerService.getFollowUpCaller().subscribe(data =>{
    //   let bsnlFollow = data

      this.adminService.getAllAsianetSalesFollowup().subscribe(data =>{
        let asianetFollow = data

        this.adminService.getAllBajajFollowup().subscribe(data =>{
          let bajajFollow = data

          this.adminService.getAllViCollectionsFollowup().subscribe(data =>{
            let viFollow = data

            this.adminService.getAllAsianetCollectionsFollowup().subscribe(data =>{
              let asianetColl = data

              this.adminService.getAllViSalesFollowup().subscribe(data =>{
                let viSale = data

                this.follow = [ ...asianetFollow, ...viFollow, ...bajajFollow, ...asianetColl, ...viSale]

                this.followCount = this.follow.filter(x => this.datePipe.transform(x.createdAt, 'yyyy-MM-dd') == this.date).length
                this.todayCount = this.follow.filter(x => this.datePipe.transform(x.createdAt, 'yyyy-MM') === this.date).length
                this.todayComCount = this.follow.filter(x => x.status != 1 && x.date === this.date).length

                this.followCountMonth = this.follow.filter(x => this.datePipe.transform(x.createdAt, 'yyyy-MM') == this.currentMonth).length
                this.pendingCount = this.follow.filter(x => this.datePipe.transform(x.date, 'yyyy-MM') === this.currentMonth).length
                this.monthComCount = this.follow.filter(x => x.status != 1 && x.date === this.date).length
              // })
            })
          })
        })
      })
    })
  }

  renderCalendarEvents() {
    const calendarApi = this.fullcalendar?.getApi();
    calendarApi.removeAllEvents();
    for (let i = 0; i < this.calendarEvents.length; i++) {
      calendarApi.addEvent(this.calendarEvents[i]);
    }
  }
}
