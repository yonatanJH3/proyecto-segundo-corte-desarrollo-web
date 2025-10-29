import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-groups',
  imports: [CommonModule],
  templateUrl: './create-groups.html',
  styleUrl: './create-groups.scss',
})
export class CreateGroups {
  selectedTab: string = 'crear-grupo-tab';

  selectTab(tabId: string) {
    this.selectedTab = tabId;
  }
}
