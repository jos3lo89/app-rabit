import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  Firestore,
  getDocs,
} from '@angular/fire/firestore';
import { RollsDb, RollsForm } from '../interfaces/rolls.interface';
import { UploadImageService } from './upload-image.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RollsService {
  private _fireStore = inject(Firestore);
  private _uploadImageService = inject(UploadImageService);
  private nameCollection = 'rolls';
  constructor() { }

  async addRolls(data: RollsForm, foto: string) {
    try {
      const imgUrl = await this._uploadImageService.uploadImage(foto);

      if (!imgUrl) return null;

      console.log(imgUrl);

      const docRef = collection(this._fireStore, this.nameCollection);

      return await addDoc(docRef, {
        ...data,
        image: imgUrl,
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  listingRolls(): Observable<RollsDb[]> {

    const collRef = collection(this._fireStore, this.nameCollection)

    return new Observable((observer) => {
      getDocs(collRef)
        .then((qrysnapshot) => {
          const items = qrysnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() } as RollsDb
          });

          observer.next(items);
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });

  }

}
