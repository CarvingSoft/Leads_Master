import { Status } from './models/status';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UploadExcelComponent } from './components/upload-excel/upload-excel.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ClientsComponent } from './components/clients/clients.component';
import { RoleComponent } from './components/role/role.component';
import { UserComponent } from './components/user/user.component';
import { ProjectTypeComponent } from './components/project-type/project-type.component';
import { ProjectComponent } from './components/project/project.component';
import { ProjectBaseComponent } from './components/project-base/project-base.component';
import { DeleteBaseComponent } from './components/delete-base/delete-base.component';
import { ExportBaseComponent } from './components/export-base/export-base.component';
import { StatusComponent } from './components/status/status.component';
import { ViewComponent } from './components/View/view/view.component';
import { HandOverComponent } from './components/hand-over/hand-over.component';
import { EditBaseComponent } from './components/Edit/edit-base/edit-base.component';
import { ProfileComponent } from '../auth/components/profile/profile.component';
import { ReportsComponent } from '../auth/components/reports/reports.component';

const routes: Routes = [
  {path: '', component:NavbarComponent,
    children:[
      {path: '', component: DashboardComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'profile/viewreport', component: ReportsComponent},
      {path: 'home', component: DashboardComponent},
      {path: 'projectbase', component: ProjectBaseComponent},
      {path: 'clients', component: ClientsComponent},
      {path: 'projects', component: ProjectComponent},
      {path: 'exportbase', component: ExportBaseComponent},
      {path: 'viewbase', component: ViewComponent},

      {path: 'settings', component: SettingsComponent},
      {path: 'settings/role', component: RoleComponent},
      {path: 'settings/user', component: UserComponent},
      {path: 'settings/status', component: StatusComponent},
      {path: 'settings/projecttype', component: ProjectTypeComponent},
      {path: 'settings/deletebase', component: DeleteBaseComponent},
      {path: 'settings/handover', component: HandOverComponent},
      {path: 'settings/editbase', component: EditBaseComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
