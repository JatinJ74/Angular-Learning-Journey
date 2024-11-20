import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }

  private timestamp(){
    return new Date().toISOString();
  }

  public log(message:string){
    console.log(`${this.timestamp()} - ${message}`);
  }
}
