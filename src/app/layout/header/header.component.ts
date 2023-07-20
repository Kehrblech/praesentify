import { Component, EventEmitter, Output } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() openDrawerEvent = new EventEmitter<void>();
  constructor(private clipboard: Clipboard, private snackBar: MatSnackBar,private platform: Platform) { }
  openDrawer() {
    this.openDrawerEvent.emit();
  }

  copyUrlToClipboard() {
    const currentSlide = "https://praesentify.netlify.app/";
    this.clipboard.copy(currentSlide);
    this.snackBar.open('Copied to clipboard!', 'Share 🎉', {
      duration: 2000,
    });
    this.share()
  }
  share() {
    if (this.platform.is('cordova')) {
      // If running on a Cordova platform (e.g., iOS or Android)
      this.shareCordova();
    } else {
      // If running in a browser supporting the Web Share API
      this.shareWeb();
    }
  }

  private shareCordova() {
    // Implement your custom sharing logic for Cordova (e.g., using Social Sharing plugin)
    // For example, using the Cordova Social Sharing plugin:
    // window.plugins.socialsharing.share('Check out this cool link!', null, null, 'https://praesentify.netlify.app/');
  }

  private shareWeb() {
    // If the device supports the Web Share API, use it
    if (navigator.share) {
      navigator.share({
        title: 'Presentation Idea Generator',
        url: 'https://praesentify.netlify.app/'
      })
      .then(() => console.log('Shared successfully!'))
      .catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback for devices that do not support the Web Share API
      console.log('Web Share API not supported.');
      // Implement your custom sharing logic for unsupported browsers here.
    }
  }
}

}
