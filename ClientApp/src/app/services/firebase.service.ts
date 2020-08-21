import { AngularFirestore } from "@angular/fire/firestore";

import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class FirebaseService {
  collectionName = "Students";

  constructor(private firestore: AngularFirestore) {}

  create_student(id, lat, long) {
    return this.firestore
      .collection("Cordenadas")
      .doc(id)
      .set({ latitud: lat, longitud: long });
  }
  read_students(id) {
    return this.firestore.collection("Cordenadas").doc(id).snapshotChanges();
  }
  read_students1() {
    return this.firestore.collection("Cordenadas").doc("1").get();
  }

  update_student(recordID, record) {
    this.firestore.doc(this.collectionName + "/" + recordID).update(record);
  }

  delete_student(record_id) {
    this.firestore.doc(this.collectionName + "/" + record_id).delete();
  }
}
