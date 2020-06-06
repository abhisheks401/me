import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-city-added',
  templateUrl: './no-city-added.component.html',
  styleUrls: ['./no-city-added.component.css']
})
export class NoCityAddedComponent implements OnInit {

  constructor(private router: Router) { }
  

  ngOnInit() {
    this.isCityAdded();
  }

  isCityAdded(){
    const citiesAdded = JSON.parse(localStorage.getItem('cities')) || [];
    if(citiesAdded.length)
    this.router.navigate(['city',citiesAdded[0].name]);
  }

}
