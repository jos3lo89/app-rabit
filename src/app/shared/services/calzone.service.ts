import { Injectable, inject } from '@angular/core';
import { Calzone, CalzoneDB } from '../interfaces/calzone.interfaces';
import { UploadImageService } from './upload-image.service';
import {
  Firestore,
  addDoc,
  collection,
  getDocs,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalzoneService {
  private _uploadService = inject(UploadImageService);
  private _fireStore = inject(Firestore);
  private _collectionName = 'calzone';

  constructor() {}

  async addCalzone(data: Calzone, foto: string) {
    try {
      const imgUrl = await this._uploadService.uploadImage(foto);
      if (!imgUrl) {
        return null;
      }

      const collRef = collection(this._fireStore, this._collectionName);

      return await addDoc(collRef, {
        ...data,
        image: imgUrl,
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  getingCalzone(): Observable<CalzoneDB[]> {
    const collRef = collection(this._fireStore, this._collectionName);

    return new Observable((observer) => {
      getDocs(collRef)
        .then((qrySnapShot) => {
          const items = qrySnapShot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() } as CalzoneDB;
          });

          observer.next(items);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
