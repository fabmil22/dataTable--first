import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class DataService {


  url = 'https://data.nasa.gov/resource/9g7e-7hzz.json';


  constructor( private http: HttpClient) { }

  getdataAll(){
    this.http.get(this.url);
  }

}
