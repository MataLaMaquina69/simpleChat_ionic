import { Component, OnInit } from '@angular/core';
import {  AuthService } from '../services/auth.service';
import { ChatService, Chat } from '../services/chat.service';
import { ModalController} from '@ionic/angular';

import {ChatComponent} from '../components/chat/chat.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public chatRooms: any = [];
  constructor(private authService: AuthService, private chatService: ChatService,
              private modal: ModalController ) {}


  onLogout() {
    this.authService.logout();

  }

  ngOnInit() {
    this.chatService.getChatRooms().subscribe(chats => {
      this.chatRooms = chats;
    });
  }
  openChat(chat) {

    this.modal.create({
      component: ChatComponent,
      componentProps: {
        name: chat.name
      }
    }).then ( (modal) => modal.present());
  }
}
