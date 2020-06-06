import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'; 
import { WeatherService } from '../../service/weather.service';
import { WeatherDetailsComponent } from '../weather-details/weather-details.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {
  addCityForm:FormGroup;
  cities: Array<any> = [];

  constructor(private weather: WeatherService, private WeatherDet: WeatherDetailsComponent,
    private router: Router) { }

  ngOnInit() {
    this.addCityForm = new FormGroup({
      city: new FormControl('', Validators.required)
    }); 
    this.cities = JSON.parse(localStorage.getItem('cities')) || [];
  }

  // adding city
  addCity(){
    this.weather.addCity(this.city)
    .subscribe((response:any) => {
      const responseBody: object = response;
      this.cities.unshift(responseBody);

      // Removing Last city and its details when more than 8 cities added
      if(this.cities.length > 8)
      this.cities.pop();

      localStorage.setItem('cities', JSON.stringify(this.cities));
      this.router.navigate(['city', this.city.value]);
      this.addCityForm.reset();
      
    },(error:any) =>{
      if(error.status == 404)
      alert('City ' + error.statusText)
      else
      alert(error.statusText);

      this.addCityForm.reset();
    });
  }

  get city(){
    return this.addCityForm.get('city');
  }

  // convert Kelvin value to celsius
  celsius(k){
    const celsius = k - 273.15;
    return celsius.toFixed(1);
  }

  // Removes all cities added
  removeAll(){ 
    this.cities = [];
    this.router.navigate(['noCityAdded']);
    localStorage.setItem('cities', JSON.stringify(this.cities) );
  }

  // Removes specific City from the list
  removeCity(i){
    this.cities.splice(i,1);
    localStorage.setItem('cities', JSON.stringify(this.cities) );
  }

  // Updates the latest weather of the specific city
  updateWeather(i){
    const city:any = [];
    city.value = this.cities[i].name; 
    this.weather.addCity(city)
    .subscribe((response:any) => {
      const responseBody: object = response;
      this.cities[i] = responseBody;
      localStorage.setItem('cities', JSON.stringify(this.cities));
    },(error:any) =>{ 
      if(error.status == 404)
      alert('City ' + error.statusText)
      else
      alert(error.statusText);

      this.addCityForm.reset();
    });
  }

 
}
