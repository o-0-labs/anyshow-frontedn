import {Component, OnInit} from '@angular/core';
import {PhotoService} from '../../../providers/services/photo.service';
import {Web3Service} from "../../../providers/services/web3.service";

@Component({
  selector: 'app-photo',
  templateUrl: 'photo.page.html',
  styleUrls: ['photo.page.scss']
})


export class PhotoPage implements OnInit {


  constructor(public photoService: PhotoService,
              public web3Service: Web3Service,
  ) {
  }

  async ngOnInit() {
    await this.photoService.loadSaved();
    this.web3Service.simpleStorageContract();
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
}
