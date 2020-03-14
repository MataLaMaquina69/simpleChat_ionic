import { Component, OnInit } from '@angular/core';
import {NavParams, ModalController} from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  public name: string;
  public messages = ['puto el que lo lea'];
  public message: string;

  constructor(private navParams: NavParams, private modal: ModalController) { }

  ngOnInit() {
    this.name = this.navParams.get('name');
  }

  closeChat() {
    this.modal.dismiss();
  }

  sendMessage() {
    this.messages.push(this.message);
    this.message = '';
  }

}
