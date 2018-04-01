import { OnInit, Injectable } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import {Subject} from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import {} from '@types/googlemaps'; 


var geocoder;
// MapsAPILoader.load().then(() => {
//   geocoder = new google.maps.Geocoder();
// //   geocoder.geocode({ 'address': address },(results, status) => {
// //     if (results[0] == undefined || results[0] == null) {
// //         return;
// //       }
// //     this.lat = results[0].geometry.location.lat();
// //     this.lng = results[0].geometry.location.lng();
  
// // });
// });


//var google:any;
@Injectable()
export class GeoService {

	// private data$:Observable<IData>;

	geoCoder;

	constructor( private mapi: MapsAPILoader) {
		this.geoCoder = Observable.create((handle)=> {
			this.mapi.load().then(() => {
		  		var geocoder = new google.maps.Geocoder();
		  		handle.next(geocoder)
		  		console.log(geocoder);
			});
		});

	}

	// ngOnInit() {

	// }

	// getCoder():Observable{
	// 	return Observable.of(this.data$);			
	// }

	getGeoCoder(){
		return this.geoCoder;
	}

}