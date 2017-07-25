import {Injectable} from '@angular/core';
import {Subject, BehaviorSubject, Observable} from 'rxjs';
import {User, Certificate }from './models';
import {UserService} from './user.service'

@Injectable()
export class CertificateService{

    certificate:Certificate[];
    private _certificates$: Subject<Certificate[]>;

    userId: number;
    certificateRoom = "certificate";
    constructor(private userService: UserService){
        this._certificates$ = <Subject<Certificate[]>> new Subject();
        this.userService.currentUser$
            .subscribe(
                (user:User)=>{
                    this.userId = user.id;
                }
            )
        this.getCertificates();
        this.registerListener();
    }

    getCertificates():void{
        let token = localStorage.getItem('token');
        let service = this;
        self["io"].socket.get('/user/'+this.userId+'/certificates?token='+token,function(resData:any){
            console.log(resData);
            service._certificates$.next(resData);
        });
    }

    
    

    get certificates(){
        return this._certificates$.asObservable();
    }

    registerListener():void{
        let room = this.certificateRoom + this.userId;
        console.log(room);
        self["io"].socket.on("certificate",function(data:any){
            console.log(data);
        })
    }

     
    
}
