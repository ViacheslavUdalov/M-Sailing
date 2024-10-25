import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.less']
})
export class SlideshowComponent implements OnInit, OnDestroy{
photos = [
'../../assets/images/IMG_0791.png',
  '../../assets/images/IMG_0795.png',
  '../../assets/images/IMG_0797.png',
  '../../assets/images/IMG_0810.png',
  '../../assets/images/IMG_6617.png'
]
  interval = 3000
  private slideShowInterval: any;
currentIndex: number = 0;
constructor() {
  }
  ngOnInit(): void {
  this.startSlideShow()
  }
  ngOnDestroy(): void {
  this.stopSlideShow();
  }
  startSlideShow() {
  this.slideShowInterval = setInterval(() => {
    this.currentIndex = (this.currentIndex + 1) % this.photos.length
  }, this.interval)
  }

stopSlideShow() {
  if (this.slideShowInterval) {
    clearInterval(this.slideShowInterval);
  }
}

}
