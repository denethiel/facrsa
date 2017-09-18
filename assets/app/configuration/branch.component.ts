import {Component, OnInit, ChangeDetectorRef, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {FormBuilder, FormGroup, Validator, AbstractControl} from '@angular/forms';
import {MessagesService} from '../shared/messages.service';
import {Observable} from 'rxjs';
import {Thread, Message} from '../shared/models'
import {Impuestos} from '../shared/sat/c_Impuesto';

@Component({
  selector:'branch',
  templateUrl:'./branch.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class BranchComponent implements OnInit {
  impuestos = Array<any>;
  messages : Observable<any>;
  draftMessage:Message;
  @Output() close = new EventEmitter<void>();
  constructor(private messagesService: MessagesService, private chRef : ChangeDetectorRef) {
    this.messages = messagesService.messages;
    this.impuestos = Impuestos;
    //chRef.detectChanges();
  }

  ngOnInit():void{

    this.impuestos.forEach((impuesto) => {
      console.log(impuesto.name)
    })

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
    this.close.emit();
  }
}
