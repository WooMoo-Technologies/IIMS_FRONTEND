import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  Url = environment.baseUrl;

  constructor(private http: HttpClient,private cookieService: CookieService) { }

  getTotalCount(): Observable<any> {
    return this.http.get(this.Url+'/totalCount', {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token'))
      })
    });

  }

}
