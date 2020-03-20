import { Component, OnInit } from '@angular/core';
import {  AuthService } from '../services/auth.service';
import { ChatService, Chat } from '../services/chat.service';
import { ModalController} from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import {ChatComponent} from '../components/chat/chat.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public chatRooms: any = [];
  constructor(private authService: AuthService, private chatService: ChatService,
              private modal: ModalController,
              public actionSheetController: ActionSheetController ) {}


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
        chat: chat
      }
    }).then ( (modal) => modal.present());
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      buttons: [{
        text: 'Logout',
        role: 'destructive',
        icon: 'log-out',
        handler: () => {
          this.onLogout()
        },
      }]
    });
    await actionSheet.present();
}
}