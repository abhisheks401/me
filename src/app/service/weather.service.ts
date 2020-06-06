import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WeatherService {

  constructor(private http: HttpClient) { }

  addCity(city){
    const url = environment.weatherURL + 'weather?q=' + city.value + '&appid=' + environment.appid
    return this.http.get(url)
    .pipe(map((response: any) =>{
      return response;
    }));
  }

  fiveDaysReport(city){
    const url = environment.weatherURL + 'forecast/daily?q=' + city.value + '&cnt=5&appid=' + environment.appid
    return this.http.get(url)
    .pipe(map((response: any) => {
      return response;
    }));
  }


  
}
