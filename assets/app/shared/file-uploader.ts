import {UploadItem} from 'angular2-http-file-upload';

export class FileUploader extends UploadItem{
  constructor(file:any, url:string){
    super();
    this.url = url;
    let token = localStorage.getItem('token');
    this.headers = {'Authorization':'Bearer ' + token +''}
    this.file = file;
  }
}
