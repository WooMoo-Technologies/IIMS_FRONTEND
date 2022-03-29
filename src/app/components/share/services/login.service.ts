import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie";
import {environment} from "../../../../environments/environment";
import {ApprovelDialogComponent} from "../../common/dialogs/approvel-dialog/approvel-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ApprovalDialogConfig} from "../../common/dialogs/approvel-dialog/model/ApprovalDialogConfig";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  LoginUrl = environment.tokenUrl;

  constructor(private http: HttpClient,
              private router: Router,
              private cookieService: CookieService,
              public dialog: MatDialog,) { }

  login(userName: string, password: string): boolean {
    let login=false;
    let authorizationData = 'Basic ' + btoa(userName + ':' + password);

    this.http.post<any>(this.LoginUrl+'/obtain', {}, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': authorizationData
      })
    }).subscribe(res => {
      console.log("res")
        console.log(res)
        if (res.responseCode  === '201') {
          this.cookieService.put('token',JSON.stringify(res.content[0].token),{ expires: new Date(new Date().getTime() +  24000 * 60 * 60) });
          this.router.navigate(['/dashboard']);
          login= true;
        }else{
          console.log("res")
          console.log(res)
          const approval5 = this.dialog.open(ApprovelDialogComponent, {
            width: '450px',
            data: new ApprovalDialogConfig('Error', 'UnSuccessful', 'Invalid Username Or Password')
          });
          approval5.afterClosed().subscribe(approve => {
            if (approve) {
              console.log('Login Unsuccessful');
            }else{
              console.log('Login successful');
            }
          });
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
