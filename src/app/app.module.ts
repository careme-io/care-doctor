import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { TopbarComponent } from './components/header/topbar/topbar.component';
import { NavbarComponent } from './components/header/navbar/navbar.component';
import { PatientsComponent } from './components/patients/patients.component';
import { MapsComponent } from './components/maps/maps.component';

import { AppRoutingModule } from './app-routing.module';

import { PatientDetailComponent } from './components/patients/patient-detail/patient-detail.component';
import { objNgFor } from './pipes/objNgFor.pipe';
import { search } from './pipes/search.pipe';
import { InptxtComponent } from './components/inptxt/inptxt.component';
import { PatientAddComponent } from './components/patients/patient-add/patient-add.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    TopbarComponent,
    NavbarComponent,
    PatientsComponent,
    MapsComponent,
    PatientDetailComponent,
    objNgFor,
    search,
    InptxtComponent,
    PatientAddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
