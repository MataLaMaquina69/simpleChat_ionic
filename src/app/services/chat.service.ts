import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Message } from '../models/message';
import { firestore } from 'firebase';

export interface Chat {
  description: string;
  name: string;
  id: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private database: AngularFirestore) { }

  getChatRooms() {
    return this.database.collection('chatsRooms').snapshotChanges().pipe(map(rooms => {
      return rooms.map(a => {
        const data = a.payload.doc.data() as Chat;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }
  getChatRoom(chatId: string) {
    return this.database.collection('chatsRooms').doc(chatId).valueChanges();

  }
  sendMessageToFirebase(message: Message, charId: string ) {
    this.database.collection('chatsRooms').doc(charId).update({
      messages: firestore.FieldValue.arrayUnion(message),
    });
  }
}
