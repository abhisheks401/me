import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../../service/weather.service';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css']
})
export class WeatherDetailsComponent implements OnInit {

  isCities: boolean = false; 
  isFiveDaysReport:boolean = false;
  cityDetails: Object = [];
  fiveDayDetails: Object = [];
  citiesAdded: any = [];

  constructor(private route: ActivatedRoute, private weather: WeatherService) { } 

  ngOnInit() {
    
    this.route.params.subscribe(routeParams => {
      this.loadDefaults();
    });
  }

  loadDefaults(){
    this.citiesAdded = JSON.parse(localStorage.getItem('cities')) || [];
    this.loadWeatherDetails();
    this.loadFiveDaysReport();
  }

  loadWeatherDetails(){ 
    const city:any = [];
    city.value = this.route.snapshot.params['cityName'];
    this.weather.addCity(city)
    .subscribe((response:any) => {
      this.isCities = true;
      this.cityDetails = response; 
    }, (error:any) => {
      if(error.status == 404)
      alert('City ' + error.statusText)
      else
      alert(error.statusText);
    })
    
    
  }

  loadFiveDaysReport(){
    const city:any = [];
    city.value = this.route.snapshot.params['cityName'];
    this.weather.fiveDaysReport(city)
    .subscribe((response:any) => { 
      this.isFiveDaysReport = true;
      this.fiveDayDetails = response.list;
    },(error:any)=>{
      alert(error.statusText);
    });
  }

  // convert Kelvin value to celsius
  celsius(k){
    const celsius = k - 273.15;
    return celsius.toFixed(1);
  }

}
