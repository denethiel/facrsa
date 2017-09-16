import {Injectable, EventEmitter, Inject } from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/share';

function getWindow():any{
    return window;
}

@Injectable()
export class SocketService{
    subscribersCounter = 0;
    socket : any;
    constructor(){
        this.socket = getWindow().io.socket;
    }
    
    on(eventName:string, callback: Function){
        this.socket.on(eventName, callback);
    }
    
    once(eventName: string, callback: Function){
        this.socket.once(eventName, callback);
    }
    
    fromEvent<T>(eventName: string):Observable<T>{
        this.subscribersCounter++;
        return Observable.create((observer:any)=>{
            this.socket.on(eventName, (data:T)=>{
                observer.next(data);
            });
            return () => {
                if(this.subscribersCounter === 1)
                    this.socket.removeListener(eventName)
            }
        }).share();
    }
    
    fromEventOnce<T>(eventName:string):Promise<T>{
        return new Promise<T>(resolve => this.once(eventName, resolve));
    }
}