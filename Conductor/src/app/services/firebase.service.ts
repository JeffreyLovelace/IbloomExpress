import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
@Injectable({
  providedIn: "root",
})
export class FirebaseService {
  constructor(private firestore: AngularFirestore) {}

  crete(id, lat, long, foto1) {
    return this.firestore
      .collection("Cordenadas")
      .doc(id)
      .set({ latitud: lat, longitud: long, foto: foto1 });
  }
  read(id) {
    return this.firestore.collection("Cordenadas").doc(id).snapshotChanges();
  }
}
