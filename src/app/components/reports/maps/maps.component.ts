 import { Component, OnInit } from '@angular/core';
import { GeoService } from './../../../services/geo.service';
import { MapsAPILoader } from '@agm/core';
import { DBService } from './../../../services/db.service';
 
 @Component({
   selector: 'app-maps',
   templateUrl: './maps.component.html',
   styleUrls: ['./maps.component.scss'],
   providers : [DBService, GeoService]
 })

 export class MapsComponent implements OnInit {
  public lat: number = 13.0826802;
  public lng: number = 80.27071840000008;
  public zoom: number;
   count: string = '1';
 
  // constructor( private geocoderService: GeocoderService) {}
  constructor( private mapsAPILoader: MapsAPILoader, private dbService: DBService, private geoService: GeoService) { }
 
   doctor;
   docID;
   docName;
   patients;

   coords:any;
   locations;

   geocoder;
    ngOnInit() {
      if(navigator.onLine){
        this.docID = localStorage.getItem('docID')
        this.docName = localStorage.getItem('docName');
        this.geoService.getGeoCoder().subscribe(geocoder => {
          this.geocoder = geocoder;
          this.dbService.getDocPatients(this.docID).subscribe(patients => {
            this.patients = patients;
            var locations = {};
              
            for(let patient of patients){
              if(patient.doc.lat == 0){
                // geocoder.geocode({ 'address': patient.doc.city },(results, status) => {
                //     if(status != 'ZERO_RESULTS'){
                //       if (results[0] == undefined || results[0] == null) {
                //           return;
                //         }
                //       patient.doc.lat = results[0].geometry.location.lat();
                //       patient.doc.lon = results[0].geometry.location.lng();
                //     }
                // });
                continue;
              }

              if(patient.doc.lat != undefined && patient.doc.lat != 0){
                let city = patient.doc.city.toLowerCase();
                if(locations.hasOwnProperty(city)){
                  locations[city].count = parseInt(locations[city].count) + 1;
                }else{
                  let newLoc = {lat: patient.doc.lat, lon: patient.doc.lon, count: 1};
                  locations[city] = newLoc;
                }
              }
              
            }
            console.log(locations);
            this.locations = [];
            for(let key in locations){
              locations[key].count = locations[key].count.toString();
              this.locations.push(locations[key]);
            }
            console.log(this.locations);
          });      
        });
      }
    }
}
 
