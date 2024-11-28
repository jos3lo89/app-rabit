import { inject, Injectable } from '@angular/core';
import { collection, Firestore, addDoc } from '@angular/fire/firestore';
import { RollsForm } from '../interfaces/rolls.interface';
import { UploadImageService } from './upload-image.service';

@Injectable({
  providedIn: 'root',
})
export class RollsService {
  private _fireStore = inject(Firestore);
  private _uploadImageService = inject(UploadImageService);
  private nameCollection = 'rolls';
  constructor() {}

  async addRolls(data: RollsForm, foto: string) {
    try {
      const imgUrl = this._uploadImageService.uploadImage(foto);

      if (!imgUrl) return null;

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
}
