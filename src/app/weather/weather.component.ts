import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { WeatherService } from '../services/weather.service';

interface WeatherDetails {
  cityName: string;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  windSpeed: number;
  descText: string;
}

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css',
})
export class WeatherComponent {
  public weatherDetails?: WeatherDetails;
  public date = new Date();

  constructor(private weatherService: WeatherService) {
  }

  ngAfterViewInit() {
    this.getUserCurrentLocation();
  }

  getUserCurrentLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      console.log('Latitude', lat, 'Longitude', lng);
      this.weatherService
        .getWeatherDataByLatLng(lat, lng)
        .subscribe((res: any) => {
          const cityName = res.name;
          const temp = res.main.temp;
          const feels_like = res.main.feels_like;
          const pressure = res.main.pressure;
          const humidity = res.main.humidity;
          const windSpeed = res.wind.deg;
          const descText = res.weather[0].description;

          this.weatherDetails = {
            cityName: cityName,
            temp: temp,
            feels_like: feels_like,
            pressure: pressure,
            humidity: humidity,
            windSpeed: windSpeed,
            descText: descText,
          };
        });
      console.log('Latitude', lat, 'Longitude', lng);
    });
  }

  getWeatherData() {
    this.weatherService
      .getWeatherDataByName('East Legon')
      .subscribe((res) => console.log(res));
  }
}
