import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {
  lat: number = 13.0827;
  lng: number = 80.2707;
  count: string = '1';

  constructor() { }

  ngOnInit() {
  }

}
