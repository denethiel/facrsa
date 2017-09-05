import {Injectable} from '@angular/core';
import {Subject, BehaviorSubject, Observable} from 'rxjs';
import {User, Certificate }from './models';
import {UserService} from './user.service'
import {Uploader} from 'angular2-http-file-upload';
import {FileUploader} from './file-uploader';

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
        let token = localStorage.getItem('token');
        let service = this;
        self["io"].socket.get('/certificate/'+this.userId+'/get?token='+token,function(resData:any){
            console.log("getCertificate " + resData);
            service._certificates = resData;
            console.log(service._certificates);
            service.updateObserver();
        });
    }

    public saveCertificate(data:any):Promise<Object>{
      let token = localStorage.getItem('token');
      return new Promise((resolve, reject) =>{
        self["io"].socket.post('/certificate/'+this.userId+'/save?token='+token,data,function(response:any) {
          console.log();
          resolve(response)
        })
      })
    }

    public uploadFile(file: File):Promise<string>{
      let uploadFile = new FileUploader(file, '/certificate/'+this.userId+'/upload');
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


    updateObserver():void{
      this.certificates$.next(this._certificates);
    }


    get certificates(){
        return this.certificates$.asObservable();
    }

    registerListener():void{
        let service = this;
        self["io"].socket.on(this.userId,function(msg:any){
            switch (msg.verb) {
              case "created":
                service._certificates.push(<Certificate> msg.data);
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
