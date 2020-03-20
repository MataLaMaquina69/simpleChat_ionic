import { Component, OnInit } from '@angular/core';
import {NavParams, ModalController} from '@ionic/angular';
import { Message } from '../../models/message';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  public chat: any;
  public messages = [];
  // public message: Message;
  public msg: string;

  public room: any;

  constructor(private navParams: NavParams, private modal: ModalController, private chatService: ChatService) { }

  ngOnInit() {
    // this.name = this.navParams.get('name');
    this.chatService.getChatRoom(this.chat.id).subscribe(room => {
      console.log(room);
      this.room = room;


    });
    this.chat = this.navParams.get('chat');
  }

  closeChat() {
    this.modal.dismiss();
  }

  sendMessage() {
    // this.messages.push(this.message);
    const mensa: Message = {
      content : this.msg,
      tytpe: 'text',
      date: new Date()
    };
    this.chatService.sendMessageToFirebase(mensa, this.chat.id);

  }

}
