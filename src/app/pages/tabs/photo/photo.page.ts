import {Component, OnInit} from '@angular/core';
import {PhotoService} from '../../../providers/services/photo.service';

@Component({
  selector: 'app-photo',
  templateUrl: 'photo.page.html',
  styleUrls: ['photo.page.scss']
})


export class PhotoPage implements OnInit {


  constructor(public photoService: PhotoService) {
  }

  async ngOnInit() {
    await this.photoService.loadSaved();
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
}
