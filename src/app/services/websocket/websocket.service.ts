import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import {Subject} from "rxjs";
import {environment} from "../../../environments/environment";
import {ChatMessage} from "../../models/ChatMessage";
import {SidebarComponent} from "../../components/sidebar/sidebar.component";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private sideBarCompSource = new Subject<any>();
  private navBarCompSource = new Subject<any>();
  private baseUrl = environment.ipAddress + environment.port;
  sideBarComp = this.sideBarCompSource.asObservable();
  navBarComp = this.navBarCompSource.asObservable();
  topic = '/topic/public/';
  stompClient: any;
  stompClientForum: any;
  constructor() {
  }
  _connect(roomId: number, message:ChatMessage, send:number) {
    var ws = new SockJS(this.baseUrl+'/chatRoom/'+roomId);
    this.stompClient = Stomp.over(ws);
    const thisService = this;
    thisService.stompClient.connect({}, function(frame:any) {
      thisService.stompClient.subscribe("/topic/public/"+roomId, function(sdkEvent:any) {
        thisService.onMessageReceived(sdkEvent);
      });
      if(send == 1) {
        thisService.stompClient.send("/app/chat.register/"+roomId,{}, JSON.stringify(message));
      } else if(send == 0){
        thisService.stompClient.send('/app/chat.leave/'+roomId, {}, JSON.stringify(message));
      } else {
        thisService.stompClient.send('/app/chat.destroy/'+roomId, {}, JSON.stringify(message));
        thisService._disconnect();
      }

        // _this.stompClient.reconnect_delay = 2000;
    },
      (error: any) =>this.errorCallBack(roomId, message, send));
  }

  _disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnected');
  }

  // on error, schedule a reconnection attempt
  errorCallBack(roomId:number, message:ChatMessage, send:number) :any{
    setTimeout(() => {
      this._connect(roomId, message ,send);
    }, 5000);
  }
  _send(message:ChatMessage, roomId:number) {
    this.stompClient.send('/app/chat.send/'+roomId, {}, JSON.stringify(message));
  }

  onMessageReceived(message: any) {
    JSON.parse(message.body);
    this.sideBarCompSource.next(JSON.parse(message.body));
    // this.remoteMonitoringCompSource.next(message);
  }

  _leave(message: ChatMessage, roomId: number) {
    if(this.stompClient == null ) {
      this._connect(roomId, message, 0);
    } else{
      this.stompClient.send('/app/chat.leave/'+roomId, {}, JSON.stringify(message));
    }
  }

  _destroyRoom(message: ChatMessage, roomId: number) {
    if(this.stompClient == null ) {
      this._connect(roomId, message, 2);
    } else{
      this.stompClient.send('/app/chat.destroy/'+roomId, {}, JSON.stringify(message));
      this._disconnect();
    }
  }

  // forumWebsocket


  _connectForum(userId:number) {
    var ws = new SockJS(this.baseUrl+'/ws');
    this.stompClientForum = Stomp.over(ws);
    const thisService = this;
    thisService.stompClientForum.connect({}, function(frame:any) {
        thisService.stompClientForum.subscribe("/topic/public/"+userId, function(sdkEvent:any) {
          thisService.onMessageReceivedForum(sdkEvent);
        });
        // _this.stompClient.reconnect_delay = 2000;
      },
      (error: any) =>this.errorCallBackForum(userId));
  }

  _disconnectForum() {
    if (this.stompClientForum != null) {
      this.stompClientForum.disconnect();
    }
    console.log('Disconnected');
  }

  onMessageReceivedForum(message: any) {
    JSON.parse(message.body);
    this.navBarCompSource.next(JSON.parse(message.body));
    // this.remoteMonitoringCompSource.next(message);
  }
  errorCallBackForum(userId:number) :any{
    setTimeout(() => {
      this._connectForum(userId);
    }, 5000);
  }
}
