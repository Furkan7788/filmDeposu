import { Component, OnInit } from '@angular/core';
import {FilmInterface} from 'filmInterface';
import {DataProviderService} from 'src/app/services/data-provider.service';
@Component({
  selector: 'app-anasayfa',
  templateUrl: './anasayfa.component.html',
  styleUrls: ['./anasayfa.component.css']
})
export class AnasayfaComponent implements OnInit {
  filmAdi = ''; // kullanicidan girilen degerleri tutmak icin degiskenler.
  viyonTarihi = '';
  film: FilmInterface;
  constructor(private dataProvider: DataProviderService ) { }

  ngOnInit(): void {

  }
  filmAra() {
    // Hem Film Ismi Hemde Vizyon Tarihi Kullanarak Arama Yapilirsa..
    if (this.filmAdi.length > 0 && this.viyonTarihi.length > 0 ) {
        this.dataProvider.setServiceUrl('http://www.omdbapi.com/?apikey=2d816371&t=' + this.filmAdi + '&y=' + this.viyonTarihi);
        this.dataProvider.getList().subscribe(data => {
         // this.dataProvider.setFilm(data); gelen veriler sadece bu ekranda kullanilacagi icin service gonderilmedi.
          this.film = data;
          // Aranan Film Varsa ise;
          if (this.film.Response === 'True') {
            this.showCard();
            document.getElementById('ikaz').style.visibility = 'hidden';
         } else {
           document.getElementById('ikaz').style.visibility = 'visible';
         }
      });
      // Sadece Film Ismine Gore Arama Yapildiginda....
    } else if (this.filmAdi.length > 0 && this.viyonTarihi.length === 0 ) {
      this.dataProvider.setServiceUrl('http://www.omdbapi.com/?apikey=2d816371&t=' + this.filmAdi) ;
      this.dataProvider.getList().subscribe(data => {
        this.film = data;
        // Aranan Film Varsa ise;
        if (this.film.Response === 'True') {
          this.showCard();
          document.getElementById('ikaz').style.visibility = 'hidden';
       } else {
         document.getElementById('ikaz').style.visibility = 'visible';
       }
    });
    } else if (this.filmAdi.length === 0 && this.viyonTarihi.length > 0) {
      alert('Lutfen Film Adinida giriniz');
    } else if (this.filmAdi.length === 0 && this.viyonTarihi.length === 0) {
      alert('Film adi ve tarih giriniz..');
    }
  }
  showCard() {
    document.getElementById('card').style.visibility = 'visible';
    document.getElementById('poster').setAttribute('src', this.film.Poster);
    document.getElementById('yayinTarihi').innerHTML = this.film.Released;
    document.getElementById('filmTuru').innerHTML = this.film.Genre;
    document.getElementById('filmSuresi').innerHTML = this.film.Runtime;
    document.getElementById('yonetmen').innerHTML = this.film.Director;
    document.getElementById('yazar').innerHTML = this.film.Writer;
    document.getElementById('oyuncular').innerHTML = this.film.Actors;
    document.getElementById('filminOrjinalDili').innerHTML = this.film.Language;
    document.getElementById('imdbRating').innerHTML = this.film.imdbRating;
    document.getElementById('ozeti').innerHTML = this.film.Plot;
  }
  favorilerimeKayitEt() {
      // favoriler sayfasinda imdbID sine gore API ye sorgu gonderilecek.
      localStorage.setItem(this.film.Title, this.film.imdbID);
      alert('Eklendi');
    }

}
