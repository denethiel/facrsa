import { uuid } from './utils';

export class User {
    id: number;
    email: string;
    rfc?:string;
    name?: string;
    address?: Address;
    telephone?:number;
    fax?:number;
    web?:string;
    gln?:string;
    admin?:boolean;
    createdAt:string;
    updatedAt:string;
}

export class Certificate{
    id:number;
    cer_file:string;
    key_file:string;
    serial_number:string;
    expiration_date:string;
    password:string;
    owner:number;
    createdAt:string;
    updatedAt:string;
}

export class Address{
    id:number;
    street?:string;
    num_ext?: number;
    num_int?: number;
    colony?: string;
    postal_code?: number;
    location?: string;
    city?:string;
    state?:string;
    country?:string;
    reference?:string;
    createdAt:string;
    updatedAt:string;
}



export class Thread {
  id: string;
  lastMessage: Message;
  name: string;
  avatarSrc: string;

  constructor(id?: string,
              name?: string,
              avatarSrc?: string) {
    this.id = id || uuid();
    this.name = name;
    this.avatarSrc = avatarSrc;
  }
}

export class Message {
  id: string;
  sentAt: Date;
  isRead: boolean;
  //author: User;
  text: string;
  thread: Thread;

  constructor(obj?: any) {
    this.id              = obj && obj.id              || uuid();
    this.isRead          = obj && obj.isRead          || false;
    this.sentAt          = obj && obj.sentAt          || new Date();
    //this.author          = obj && obj.author          || null;
    this.text            = obj && obj.text            || null;
    this.thread          = obj && obj.thread          || null;
  }
}
