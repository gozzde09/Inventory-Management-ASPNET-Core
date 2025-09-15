import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterLink, NgbModule, RouterLinkActive],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Frontend');
  isCollapsed = true;
}
