import {Injectable} from '@angular/core';
import {Subject, BehaviorSubject} from 'rxjs';
import {User} from './models';
import { AuthHttp } from 'angular2-jwt'

@Injectable()
export class UserService {

    constructor(private http: AuthHttp){}

    currentUser: User;
    currentUser$: Subject<User> = new BehaviorSubject<User>(this.currentUser);

    public setCurrentUser(newUser: User):void{
        this.currentUser$.next(newUser);
        this.currentUser = newUser;
        //console.log(this.currentUser);
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

    public uploadCertificate(data:any):void{
      this.http.post('/user/'+this.currentUser.id+'/certificate',JSON.stringify(data))
        .subscribe(response => {
          console.log(response.json());
        })
    }
}
