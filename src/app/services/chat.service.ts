import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
// import { message } from "../models/message";

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
        const data = a.payload.doc.data() as Chat ;
         data.id = a.payload.doc.id;
         return data;
      });
    }));

  }
}
