import {Injectable} from '@angular/core';
import {componentDTO} from "../dto/componentDTO";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {environment} from "../../../../environments/environment";
import {updateDTO} from "../dto/UpdateCompDTO";

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  Url = environment.baseUrl;

  constructor(private http: HttpClient,private cookieService: CookieService) { }

  saveComponents(componentdto: componentDTO): Observable<any>{

    return this.http.post<any>(this.Url+'/add', {
      componetName:componentdto.componetName,
      componetDesc:componentdto.componetDesc,
      imageURL:componentdto.imageURL,
      qty:componentdto.qty,
      unitPrice:componentdto.unitPrice,
      componetCode:componentdto.componetCode

    }, {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token'))
      })
    });

  }

  getAllComponents(pageIndex: string, pageSize: string): Observable<any> {
    return this.http.get(this.Url+'/getAllComponets/'+pageIndex+'/'+pageSize, {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token'))
      })
    });

  }

  deleteComponent(componetID: string| number): Observable<any> {
    return this.http.delete(this.Url+'/delete/'+componetID, {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token'))
      })
    });

  }

  updateComponents(componentdto:updateDTO): Observable<any>{

    return this.http.post<any>(this.Url+'/update', {
      componetID: JSON.stringify(componentdto.componetID),
      componetName:componentdto.componetName,
      componetDesc:componentdto.componetDesc,
      imageURL:componentdto.imageURL,
      qty:componentdto.qty,
      unitPrice:componentdto.unitPrice,
      componetCode:componentdto.componetCode

    }, {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token'))
      })
    });
  }

  searchComponent(componetID: string| number): Observable<any> {
    return this.http.get(this.Url+'/serach/'+componetID, {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token'))
      })
    });

  }


}
