import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
@Injectable({
  providedIn: "root",
})
export class FirebaseService {
  constructor(private firestore: AngularFirestore) {}

  crete(id, lat, long) {
    return this.firestore
      .collection("Cordenadas")
      .doc(id)
      .set({ latitud: lat, longitud: long });
  }
  read(id) {
    return this.firestore.collection("Cordenadas").doc(id).snapshotChanges();
  }
}
