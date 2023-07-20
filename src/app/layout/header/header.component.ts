import { Component, EventEmitter, Output } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() openDrawerEvent = new EventEmitter<void>();
  constructor(private clipboard: Clipboard, private snackBar: MatSnackBar) { }
  openDrawer() {
    this.openDrawerEvent.emit();
  }

  copyUrlToClipboard() {
    const currentSlide = "https://praesentify.netlify.app/";
    this.clipboard.copy(currentSlide);
    this.snackBar.open('Copied to clipboard!', 'Share', {
      duration: 2000,
    });
  }

}
