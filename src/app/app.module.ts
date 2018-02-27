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
import { inArray } from './pipes/inArray.pipe';
import { InptxtComponent } from './components/inptxt/inptxt.component';
import { PatientAddComponent } from './components/patients/patient-add/patient-add.component';
import { AdvtxtareaComponent } from './components/advtxtarea/advtxtarea.component';
import { VtimelineComponent } from './components/vtimeline/vtimeline.component';
import { DiagMomentComponent } from './components/vtimeline/diag-moment/diag-moment.component';
import { AttViewerComponent } from './components/patients/att-viewer/att-viewer.component';
import { ForKeysPipe } from './pipes/for-keys.pipe';
import { StatusBarComponent } from './components/status-bar/status-bar.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { AgmCoreModule } from '@agm/core';


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
    PatientAddComponent,
    AdvtxtareaComponent,
    VtimelineComponent,
    DiagMomentComponent,
    AttViewerComponent,
    ForKeysPipe,
    StatusBarComponent,
    LoginComponent,
    ProfileComponent,
    DoctorsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCKiuddTtmCj179fP6fnQeMOPKsNIJ9lms'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
