import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material/material.module';
import { AdminRoutingModule } from './admin-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
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
import { AsianetSalesComponent } from './components/Edit/asianet-sales/asianet-sales.component';
import { AsianetCollectionsComponent } from './components/Edit/asianet-collections/asianet-collections.component';
import { ViCollectionsComponent } from './components/Edit/vi-collections/vi-collections.component';
import { ViSalesComponent } from './components/Edit/vi-sales/vi-sales.component';
import { BajajComponent } from './components/Edit/bajaj/bajaj.component';
import { ViewAcComponent } from './components/View/view-ac/view-ac.component';
import { ViewAsComponent } from './components/View/view-as/view-as.component';
import { ViewVisComponent } from './components/View/view-vis/view-vis.component';
import { ViewVicComponent } from './components/View/view-vic/view-vic.component';
import { ViewBajComponent } from './components/View/view-baj/view-baj.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    NavbarComponent,
    DashboardComponent,
    HomeComponent,
    UploadExcelComponent,
    SettingsComponent,
    ClientsComponent,
    RoleComponent,
    UserComponent,
    ProjectTypeComponent,
    ProjectComponent,
    ProjectBaseComponent,
    DeleteBaseComponent,
    ExportBaseComponent,
    StatusComponent,
    ViewComponent,
    HandOverComponent,
    EditBaseComponent,
    AsianetSalesComponent,
    AsianetCollectionsComponent,
    ViCollectionsComponent,
    ViSalesComponent,
    BajajComponent,
    ViewAcComponent,
    ViewAsComponent,
    ViewVisComponent,
    ViewVicComponent,
    ViewBajComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule
  ],
  providers: [
    DatePipe // Add DatePipe to providers
  ]
})
export class AdminModule { }
