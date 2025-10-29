import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gestion-registro',
  imports: [CommonModule],
  templateUrl: './gestion-registro.html',
  styleUrl: './gestion-registro.scss',
})
export class GestionRegistro {
  selectedTab: string = 'estudiantes-tab';

  selectTab(tabId: string) {
    this.selectedTab = tabId;
  }

}
