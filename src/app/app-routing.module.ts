import { HomeComponent } from './components/home/home.component';
import { PatientsComponent } from './components/patients/patients.component';
import { MapsComponent } from './components/maps/maps.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
    	path: 'patients',
    	component: PatientsComponent
    },
    {
    	path: 'maps',
    	component: MapsComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
