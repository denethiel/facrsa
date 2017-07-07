import {Injectable} from '@angular/core';
import {Subject, BehaviorSubject} from 'rxjs';
import {User} from './models';
import { AuthHttp } from 'angular2-jwt'

@Injectable()
export class UserService {

    constructor(private http: AuthHttp){}

    currentUser: Subject<User> = new BehaviorSubject<User>(null);

    public setCurrentUser(newUser: User):void{
        this.currentUser.next(newUser);
    }

    public saveGeneralData(data:any):void{
      this.http.post('/user/', JSON.stringify(data))
      .subscribe(response => console.log(response.json()),
      err => console.log(err),
      () => console.log('Request Complete')
      );
    }
}
