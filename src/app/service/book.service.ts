import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../model/book';

const BASE_URL = 'http://localhost/api/book/';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) {
  }

  loadAllBooks(): Observable<HttpResponse<Book[]>> {
    console.log(BASE_URL);
    return this.http.get<Book[]>(BASE_URL + 'all', {observe: 'response'});
  }
}
