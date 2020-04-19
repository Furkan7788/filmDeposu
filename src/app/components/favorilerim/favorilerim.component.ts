import { Component, OnInit } from '@angular/core';
import {DataProviderService} from 'src/app/services/data-provider.service';
import {FilmInterface} from 'filmInterface';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-favorilerim',
  templateUrl: './favorilerim.component.html',
  styleUrls: ['./favorilerim.component.css']
})
export class FavorilerimComponent implements OnInit {
  constructor(public dataProvider: DataProviderService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.dataProvider.favoriFilmlerim = []; // eski degerlerin ustune yazilmamasi icin dizi sifirlandi.
    for (let i = 0; i < localStorage.length; i++) { // Favori olarak kayıt edilmiş ımdbID numarasına gore sorgu atıldı.
      this.dataProvider.setServiceUrl('http://www.omdbapi.com/?apikey=2d816371&i='
      + localStorage.getItem(localStorage.key(i)));
      this.dataProvider.getList().subscribe(data => {
        this.dataProvider.favoriFilmlerim.push(data);
    });
   }
  }
  transform(url) {
    const path = this.sanitizer.bypassSecurityTrustUrl(url);
    return path;
  }
  favorilerimdenCikar(imdbID) {
      localStorage.removeItem(imdbID);
      this.ngOnInit();

  }
}
