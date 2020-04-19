import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FilmInterface} from 'filmInterface';
@Injectable({
  providedIn: 'root'
})
export class DataProviderService {
  private serviceUrl;
  constructor(private http: HttpClient) { }
  favoriFilmlerim: FilmInterface[] = [];
  private film: FilmInterface;

  getServiceUrl() {
    return this.serviceUrl;
  }
  setServiceUrl(serviceURL) {
    this.serviceUrl = serviceURL;
  }
  getList() {
    return this.http.get<FilmInterface>(this.getServiceUrl());
  }
  setList(list: any) {
    return this.http.post<any>(this.getServiceUrl(), list);
  }
  getFilm() {
    return this.film;
  }
  setFilm( film ) {
    this.film = film;
  }
}

