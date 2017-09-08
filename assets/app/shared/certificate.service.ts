import {Injectable} from '@angular/core';
import {Subject, BehaviorSubject, Observable} from 'rxjs';
import {User, Certificate }from './models';
import {UserService} from './user.service'
import {Uploader} from 'angular2-http-file-upload';
import {FileUploader} from './file-uploader';
import {Utils} from './utils';

let io : any;

@Injectable()
export class CertificateService{

    private _certificates:Certificate[];
    private certificates$: Subject<Certificate[]> = new BehaviorSubject<Certificate[]>(this._certificates);

    userId: number;
    certificateRoom = "certificate";
    constructor(private userService: UserService, private uploaderService: Uploader){
        this.userService.currentUser
            .subscribe(
                (user:User)=>{

                    this.userId = user.id;
                    console.log("Nuevo usuario " + this.userId);
                    this.getCertificates();
                    this.registerListener();
                }
            )

    }

    getCertificates():void{
        let token = this.getToken();
        let service = this;
        self["io"].socket.get('/certificate/'+this.userId+'/get?token='+token,function(resData:any){
            console.log("getCertificate " + resData);
            service._certificates = resData;
            console.log(service._certificates);
            service.updateObserver();
        });
    }

    public saveCertificate(data:any):Promise<Object>{
      let token = this.getToken();
      return new Promise((resolve, reject) =>{
        self["io"].socket.post('/certificate/'+this.userId+'/save?token='+token,data,function(response:any) {
          console.log(response);
          resolve(response)
        })
      })
    }

    private getToken(){
      return localStorage.getItem('token');
    }

    public deleteCertificate(certificate:Certificate){
      let token = this.getToken();
      let service = this;
      self["io"].socket.delete('/certificate/'+this.userId+'/delete?token='+token, certificate, function(resData:any){
        console.log("deletelCertificate"+ resData);
      });
    }

    public uploadFile(file: File):Promise<string>{
      let uploadFile = new FileUploader(file, '/certificate/'+this.userId+'/upload');
      return new Promise((resolve, reject) => {
        this.uploaderService.onSuccessUpload = (item, response, status, headers) => {
            resolve(JSON.parse(response).filename);
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


    updateObserver():void{
      this.certificates$.next(this._certificates);
    }


    get certificates(){
        return this.certificates$.asObservable();
    }

    registerListener():void{
        let service = this;
        self["io"].socket.on("certificate",function(msg:any){
            console.log(msg);
            switch (msg.verb) {
              case "created":

                service._certificates.push(<Certificate> msg.data);
                service.updateObserver();
                break;

              case "destroy":

                var index = Utils.getIndex(service._certificates, msg.data[0].id);
                service._certificates.splice(index,1);
                console.log(service._certificates);
                service.updateObserver();
                break;

              default:
                // code...
                break;
            }
            console.log(msg);
        })
    }



}
