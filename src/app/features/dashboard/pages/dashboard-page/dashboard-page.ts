import { AfterViewInit, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule, 
    MatListModule, 
    MatFormFieldModule, 
    MatSelectModule, 
    MatButtonModule,
    MatGridListModule
  ],
  templateUrl: './dashboard-page.html',
  styleUrls: ['./dashboard-page.scss'],
})
export class DashboardPage /*implements AfterViewInit*/ {
  selectedRange = 'mes';


  /*ngAfterViewInit(): void {
    new Chart('rendimientoChart', {
      type: 'line',
      data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Promedio',
            data: [3.8, 4.0, 4.1, 4.2, 4.3, 4.1],
            fill: true,
            borderColor: '#3f51b5',
            backgroundColor: 'rgba(63,81,181,0.1)',
            tension: 0.3,
          },
        ],
      },
      options: {
        plugins: { legend: { display: false } },
        scales: {
          y: { min: 3.5, max: 5.0 },
        },
      },
    });
  }*/
}
