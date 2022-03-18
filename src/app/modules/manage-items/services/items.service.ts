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


  addUser(componentdto: componentDTO, imageURL:any): Observable<any> {


    const formData: any = new FormData();

    formData.append("componetName", componentdto.componetName);
    formData.append("componetDesc", componentdto.componetDesc);
    formData.append("qty", componentdto.qty);
    formData.append("unitPrice", componentdto.unitPrice);
    formData.append("componetCode", componentdto.componetCode);
    formData.append("imageURL",imageURL,imageURL.name);
    console.log("udara3")
    console.log(imageURL)
    return this.http.post<any>(this.Url+'/add', formData, {
      headers:new HttpHeaders({

        'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token')),
      })
    })
  }

  updateComponents(componentdto: updateDTO, imageURL:any): Observable<any>{

    const formData: any = new FormData();

    formData.append(JSON.stringify(componentdto.componetID));
    formData.append("componetName", componentdto.componetName);
    formData.append("componetDesc", componentdto.componetDesc);
    formData.append("qty", componentdto.qty);
    formData.append("unitPrice", componentdto.unitPrice);
    formData.append("componetCode", componentdto.componetCode);
    formData.append("imageURL",imageURL,imageURL.name);

    return this.http.post<any>(this.Url+'/update', formData, {
      headers:new HttpHeaders({
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



  searchComponent(componetID: string| number): Observable<any> {
    return this.http.get(this.Url+'/serach/'+componetID, {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token'))
      })
    });

  }


}
