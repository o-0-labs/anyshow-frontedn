import {Component, OnInit, ViewChild} from '@angular/core';
import {IonSlides, NavController, Platform} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {loginPage, TUTORIAL_SLIDE1, TUTORIAL_SLIDE2, TUTORIAL_SLIDE3, TUTORIAL_SLIDE4} from '../index';
import {CacheKeys, CacheService} from '../../providers/common/cache-service';


export interface Slide {
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {
  @ViewChild('ionSlides', {static: true}) ionSlides: IonSlides;
  showSkip = true;
  slides: Slide[];
  tutorialSlide4: string = TUTORIAL_SLIDE4;

  constructor(public navController: NavController,
              public translate: TranslateService,
              public platform: Platform,
              public cacheService: CacheService) {
    this.translate.get(['TUTORIAL_SLIDE1_TITLE',
      'TUTORIAL_SLIDE1_DESCRIPTION',
      'TUTORIAL_SLIDE2_TITLE',
      'TUTORIAL_SLIDE2_DESCRIPTION',
      'TUTORIAL_SLIDE3_TITLE',
      'TUTORIAL_SLIDE3_DESCRIPTION',
    ]).subscribe((values) => {
      // console.log('Loaded values', values);
      this.slides = [
        {
          title: values.TUTORIAL_SLIDE1_TITLE,
          description: values.TUTORIAL_SLIDE1_DESCRIPTION,
          image: TUTORIAL_SLIDE1,
        },
        {
          title: values.TUTORIAL_SLIDE2_TITLE,
          description: values.TUTORIAL_SLIDE2_DESCRIPTION,
          image: TUTORIAL_SLIDE2,
        },
        {
          title: values.TUTORIAL_SLIDE3_TITLE,
          description: values.TUTORIAL_SLIDE3_DESCRIPTION,
          image: TUTORIAL_SLIDE3,
        }
      ];
    });
  }

  ngOnInit() {
  }

  onSlideChangeStart(event) {
    event.target.isEnd().then(isEnd => {
      this.showSkip = !isEnd;
    });
  }

  startApp() {
    this.navController.navigateRoot(loginPage).then();
    this.cacheService.set(CacheKeys.launched, true).then();
  }

}
