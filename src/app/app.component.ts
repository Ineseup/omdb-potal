import { Component , ViewChild } from '@angular/core';
import { of } from "rxjs";
import { HttpClient} from "@angular/common/http";
import { FormControl } from '@angular/forms';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('movieSearchInput', { static: true })

  baseURL = environment.baseURL;
  isSearching: boolean;
  movieDetails: any;
  movieName: string = '';
  moviePoster: string = '';
  movieNames: any[] = [];
  hideMovieDetails = true;
  readonly keyword = 'Title';

  constructor(
    private httpClient: HttpClient
  ) {
    this.isSearching = false;
    this.movieDetails = [];
  }

  onChangeSearch(text: string) {
    console.log(this.movieNames);
    this.searchGetCall(text).subscribe((res: any) => {
      this.movieNames = res.Search;
    }, (err) => {
      this.isSearching = false;
      console.log('error', err);
    });
  }

  selectEvent(item: any) {
    this.isSearching = false;
    this.getDetails(item);
  }

  searchGetCall(movieName: string) {
    if (movieName === '') {
      return of([]);
    }
    return this.httpClient.get(`${environment.baseURL}/name?name=${movieName}`);
  }

  getDetails(movie: any){
    this.hideMovieDetails = false;
    this.httpClient.get(`${environment.baseURL}/id?id=${movie.imdbID}`)
    .subscribe((data: any) => {
      this.movieDetails = new Map(Object.entries(data['details']));
      this.movieName = data['title'];
      this.moviePoster = data['poster'];
    })
  }
}
