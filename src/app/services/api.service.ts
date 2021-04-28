import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService<T = any> {

  private readonly baseUrl = `${environment.apiHost}/`;

  constructor(private http: HttpClient) {
  }

  get(url: string, options?: any): Observable<T> {
    return this.transform(this.http.get(this.baseUrl + url, options));
  }

  post(url: string, data: T, options?: any): Observable<T> {
    return this.transform(this.http.post(this.baseUrl + url, data, options));
  }

  delete(url: string): Observable<T> {
    return this.transform(this.http.delete(this.baseUrl + url));
  }

  put(url: string, data: T): Observable<T> {
    return this.transform(this.http.put(this.baseUrl + url, data));

  }

  private transform(f: Observable<any>): Observable<T> {
    return f.pipe(map((res: T) => res as T));
  }

}
