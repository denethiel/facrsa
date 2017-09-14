import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validator, AbstractControl} from '@angular/forms';
import {MessagesService} from '../shared/messages.service';
import {Observable} from 'rxjs';
import {Thread, Message} from '../shared/models'

@Component({
  selector:'branch',
  templateUrl:'./branch.component.html'
})
export class BranchComponent implements OnInit {

  messages : Observable<any>;
  draftMessage:Message;
  constructor(private messagesService: MessagesService) {
    this.messages = messagesService.messages;
  }

  ngOnInit():void{

    let thread: Thread = new Thread('t1','Nate','');

    let m1 : Message = new Message({
      text:'Hola',
      thread: thread
    });

    let m2: Message = new Message({
      text:'Adios',
      thread: thread
    });

    this.draftMessage = new Message();

    this.messagesService.newMessages.subscribe((message:Message) => {
      console.log('=> newMessage:' + message.text);
    })

    this.messagesService.messages.subscribe((messages: Message[]) => {
      console.log('=> messages:' + messages.length);
    })

    this.messagesService.addMessage(m1);
    this.messagesService.addMessage(m2);

  }
  onEnter(event: any): void {
    this.sendMessage();
    event.preventDefault();
  }
  sendMessage():void{
    let thread: Thread = new Thread('t1','Nate','');
    let m : Message = this.draftMessage;
    m.thread = thread;
    m.isRead = true;
    this.messagesService.addMessage(m);
    this.draftMessage = new Message();
  }
}
