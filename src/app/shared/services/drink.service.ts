import { inject, Injectable } from '@angular/core';
import {
  collection,
  Firestore,
  addDoc,
  getDocs,
} from '@angular/fire/firestore';
import { UploadImageService } from './upload-image.service';
import { Drink, DrinkDb } from '../interfaces/drink.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DrinkService {
  private _fireStore = inject(Firestore);
  private _uploadImageService = inject(UploadImageService);
  private collectionName = 'drinks';

  constructor() {}

  async addDrink(drink: Drink, image: string) {
    try {
      const imgUrl = await this._uploadImageService.uploadImage(image);

      if (!imgUrl) return null;

      const imgRef = collection(this._fireStore, this.collectionName);

      return await addDoc(imgRef, {
        ...drink,
        image: imgUrl,
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  listingDrinks(): Observable<DrinkDb[]> {
    const collRef = collection(this._fireStore, this.collectionName);

    return new Observable((observer) => {
      getDocs(collRef)
        .then((qrySnapShot) => {
          const items = qrySnapShot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() } as DrinkDb;
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
