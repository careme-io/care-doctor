import { HomeComponent } from './components/home/home.component';
import { PatientsComponent } from './components/patients/patients.component';
import { ReportsComponent } from './components/reports/reports.component';
import { MapsComponent } from './components/reports/maps/maps.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/authGuard.service';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: HomeComponent
    },
    {
    	path: 'patients',
        canActivate: [AuthGuard],
    	component: PatientsComponent
    },
    {
        path: 'reports',
        canActivate: [AuthGuard],
        component: ReportsComponent,
        children: [
            {path: 'maps', component: MapsComponent}
        ]
    },
    {
    	path: 'profile',
        canActivate: [AuthGuard],
    	component: ProfileComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'doctor',
        component: DoctorsComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
