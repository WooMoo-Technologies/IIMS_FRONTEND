import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  LoginUrl = environment.tokenUrl;

  constructor(private http: HttpClient,
              private router: Router,
              private cookieService: CookieService) { }

  login(userName: string, password: string): boolean {
    let login=false;
    let authorizationData = 'Basic ' + btoa(userName + ':' + password);


    this.http.post<any>(this.LoginUrl+'/obtain', {}, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': authorizationData
      })
    }).subscribe(res => {
        console.log(res)
        if (res.responseCode  === "201") {
          this.cookieService.put('token',JSON.stringify(res.content[0].token),{ expires: new Date(new Date().getTime() +  24000 * 60 * 60) });
          this.router.navigate(['/dashboard']);
          login= true;
        }
      }
    );
    return login;
  }
  verifyLogin():boolean{
    return this.cookieService.hasKey('token');
  }
  logout(){
    this.cookieService.remove('token');
    this.router.navigate(['/login']);

  }

}
