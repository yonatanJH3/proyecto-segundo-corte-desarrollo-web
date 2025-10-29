import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ necesario para *ngIf y *ngFor
import { RouterModule } from '@angular/router'; // ✅ necesario para routerLink
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule, MatIconModule, MatTooltipModule],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.scss'],
})
export class MainLayoutComponent {
  isCollapsed = false;
  currentDate: Date = new Date();

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}