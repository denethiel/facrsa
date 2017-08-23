import {Injectable} from '@angular/core';
import {Subject, BehaviorSubject, Observable} from 'rxjs';
import {User, Certificate }from './models';
import {UserService} from './user.service'

@Injectable()
export class CertificateService{

    private _certificates:Certificate[];
    private certificates$: Subject<Certificate[]> = new BehaviorSubject<Certificate[]>(this._certificates);

    userId: number;
    certificateRoom = "certificate";
    constructor(private userService: UserService){
        this.userService.currentUser
            .subscribe(
                (user:User)=>{
                    console.log("Nuevo usuario");
                    this.userId = user.id;
                    this.getCertificates();
                    this.registerListener();
                }
            )
        
    }

    getCertificates():void{
        let token = localStorage.getItem('token');
        let service = this;
        self["io"].socket.get('/user/'+this.userId+'/certificates?token='+token,function(resData:any){
            service._certificates = resData;
            console.log(service._certificates);
            service.updateObserver();
        });
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
