import {Injectable} from '@angular/core';
import {Subject, BehaviorSubject} from 'rxjs';
import {User, Certificate}from './models';
import {UserService} from './user.service'

@Injectable()
export class CertificateService{

    certificates: Certificate[];
    certificates$: Subject<Certificate[]> = new BehaviorSubject<Certificate[]>(this.certificates);

    userId: number;

    constructor(private userService: UserService){
        
        this.userService.currentUser$
            .subscribe(
                (user:User)=>{
                    this.userId = user.id;
                }
            )
        this.getCertificates();
    }

    registerListener():void{
        
    }

    public getCertificates(){
        let token = localStorage.getItem('token');
        self["io"].socket.get('/user/'+this.userId+'/certificates?token='+token+'',function(resData:any){
            console.log(resData);
        });
        
    }
}
