import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'https://open-weather13.p.rapidapi.com/city/';

  private readonly options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '09fb67207emsh3098f2e3d2bf970p1649e6jsn96c1bd30f22c',
      'x-rapidapi-host': 'open-weather13.p.rapidapi.com',
    },
  };

  getWeatherDataByName(city: string) {
    return this.http.get(this.baseUrl + city + '/EN', this.options);
  }

  getWeatherDataByLatLng(lat: number, lng: number) {
    return this.http.get(
      this.baseUrl + 'latlon/' + lat + '/' + lng,
      this.options
    );
  }
}
