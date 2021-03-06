import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';
@Injectable()
export class SocketService {
  public static www_hello = 'www_hello';
  public static client_fire_outputnode = 'client_fire_outputnode';
  protected socket:SocketIOClient.Socket = null;
  constructor() {

    this.socket = io('http://localhost:3000');//https://chaoscraft-api.schematical.com');
    console.log("Setting Up Socket");

    this.socket.on('www_hello_response', (message) => {
      console.log('www_hello_response', message)
    })
    this.socket.on('request_handshake', (message) => {
      this.socket.emit('www_hello', {foo: 'bar'});
    })

    this.socket.emit('www_hello', {foo: 'bar'});
  }
  on(event, callback){
    this.socket.on(event, callback);
  }
  emit(event, data){
    this.socket.emit(event, data);
  }
  clientStartObserve(data){
    this.socket.emit('client_start_observe', data);
  }
  clientEndObserve(data){
    this.socket.emit('client_end_observe', data);
  }

}
