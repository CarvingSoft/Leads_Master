import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, mapTo, Observable, of, ReplaySubject, startWith, tap, throwError } from 'rxjs';
import { User } from './models/user';
import { Role } from './models/role';
import { environment } from 'src/environments/environment';
// import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})


export class AuthService {

  private readonly token = 'token'
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN'
  private loggedUser: any

  constructor(private _http:HttpClient) { }

  private  currentUserSource = new ReplaySubject<User>(1)

  currentUser$ = this.currentUserSource.asObservable().pipe(
    startWith()
  );

  url = environment.baseUrl

  saveUser(data:any){
    return this._http.post(this.url+'/register',data)
  }

  login(data: any){
    return this._http.post(this.url + '/login', data)
    .pipe(
      tap((tokens) => this.doLoginUser(data.employeeNo, tokens)),
      mapTo(true),
      catchError((error: any) => {
        return of(false)
      })
    )
  }

  private doLoginUser(userName: String, tokens: any){
    // this.loggedUser = userName
    this.storeTokens(tokens)
  }

  private storeTokens(tokens: any){
    localStorage.setItem(this.JWT_TOKEN, tokens.token.accessToken)
    // localStorage.setItem(this.REFRESH_TOKEN, tokens.token.refreshToken)
    localStorage.setItem('token', JSON.stringify(tokens))
  }

  getJwtToken(){
    return localStorage.getItem(this.JWT_TOKEN);
  }

  isLoggedIn(): boolean{
    let loggedStatus = this.getJwtToken()
    return !!this.getJwtToken();
  }

  logout(){
    localStorage.clear()
  }

  //ROLE

  getRoleById(id: number):Observable<Role>{
    return this._http.get<Role>(this.url + '/role/'+ id)
  }

  getRole(): Observable<Role[]>{
    return this._http.get<Role[]>(this.url + '/role')
  }

  addRole(data: any){
    return this._http.post(this.url + '/role', data)
  }

  deleteRole(id: number){
    return this._http.delete(this.url + '/role/'+ id)
  }

  updateRole(id: number, data: any): Observable<Role>{
    return this._http.patch<Role>(this.url + '/role/'+ id, data)
  }

  //USER
  getUserById(id: number):Observable<User>{
    return this._http.get<User>(this.url + '/register/'+ id)
  }

  getUser(): Observable<User[]>{
    return this._http.get<User[]>(this.url + '/register')
  }

  addUser(data: any){
    return this._http.post(this.url + '/register', data)
  }

  deleteUser(id: number){
    return this._http.delete(this.url + '/register/'+ id)
  }

  updateUser(id: number, data: any): Observable<User>{
    return this._http.patch<User>(this.url + '/register/'+ id, data)
  }

  uploadUserImage(file: Blob): Observable<any> {
    if (file instanceof File) {
      const formData = new FormData();
      formData.append("file", file, file.name);
      return this._http.post(this.url + '/register/userfileupload', formData);
    } else {
      // Handle the case where 'file' is not a File object
      return throwError("Invalid file type");
    }
  }

  editUserUploadImage(data:any, id:number):Observable<User>{
    return this._http.patch<User>(this.url+'/register/userupload/'+id, data);
  }
}


