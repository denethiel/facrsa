import {Injectable} from '@angular/core';
import {Subject, BehaviorSubject} from 'rxjs';
import {User} from './models';
import { AuthHttp } from 'angular2-jwt'
import {Http, Headers, RequestOptionsArgs} from '@angular/http'
import {Uploader} from 'angular2-http-file-upload'
import {FileUploader} from './file-uploader'

let io : any;

@Injectable()
export class UserService {

    constructor(private http: AuthHttp, private http$: Http, private uploaderService: Uploader){
      console.log("User Service Iniciado");
    }

    private _currentUser: User;
    private currentUser$: Subject<User> = new BehaviorSubject<User>(this._currentUser);

    public setCurrentUser(newUser: User):void{
        this._currentUser = newUser;
        this.currentUser$.next(this._currentUser);

        //console.log(this.currentUser);
    }

    get currentUser(){
      return this.currentUser$.asObservable();
    }

    public saveGeneralData(data:any):void{
      this.http.post('/user/', JSON.stringify(data))
      .subscribe(response => {
        //console.log(JSON.stringify(response.json()));
        localStorage.setItem('user',JSON.stringify(response.json()));
        this.setCurrentUser(<User> JSON.parse(JSON.stringify(response.json())));
      },
      err => console.log(err),
      () => console.log('Request Complete')
      );
    }

    public leave():Promise<any>{
      let token = localStorage.getItem('token');
      return new Promise((resolve, reject) =>{
        io.socket.post('/user/'+this._currentUser.id+'/leave?token='+token,function(response:any){
        resolve(response);
        })
      })

    }

    public saveCertificate(data:any):Promise<Object>{
      let token = localStorage.getItem('token');
      return new Promise((resolve, reject) =>{
        console.log(this._currentUser)
        io.socket.post('/user/'+this._currentUser.id+'/save-certificate?token='+token,data,function(response:any) {
          console.log();
          resolve(response)
        })
      })
    }

    public deleteCertificate(data:any):void{
      this.http.delete('/user/',JSON.stringify(data))
        .subscribe(response =>{
          console.log(response.json())
        })
    }

    public uploadCertificate(file:File):Promise<string>{
      let uploadFile = new FileUploader(file, '/user/'+this._currentUser.id+'/upload-certificate');
      return new Promise((resolve, reject) => {
        this.uploaderService.onSuccessUpload = (item, response, status, headers) => {
            console.log("Subido")
            resolve(response.filename);
        };
        this.uploaderService.onErrorUpload = (item, response, status, headers) => {
             console.log("Error")
             reject(response.message);
        };
        this.uploaderService.upload(uploadFile);
        this.uploaderService.onProgressUpload = (item, percentComplete) => {
        console.log(percentComplete);
      }
      })

    }
    /*
    public uploadCertificate(data:any):Promise<string>{
      console.log(data);
      let formData: FormData = new FormData();
      formData.append("keyFile",data.keyFile,data.keyFile.name);
      //input.append("cerFile",data.cerFile,data.cerFile.name);
      //input.append("password",data.password);
      let headers = new Headers();
      let token = localStorage.getItem('token');
      headers.append('Authorization', 'Bearer ' + token);
      //headers.append('Content-Type', undefined);
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept','application/json');
      let options: RequestOptionsArgs = {headers: headers, withCredentials: true};
      return new Promise((resolve, reject) => {
        this.http$.post('/user/'+this.currentUser.id+'/certificate',formData ,options).toPromise()
        .then(response => {
          let jsonData = response.json();
          console.log(jsonData);
          resolve(jsonData);
        })
        .catch(reason => reject (reason.statusText));
      });
    }
    */
}
