import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { isPlatformBrowser } from '@angular/common';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [

  ],
  templateUrl: './dashboard-page.html',
  styleUrls: ['./dashboard-page.scss'],
})
export class DashboardPage implements AfterViewInit, OnDestroy {
  @ViewChild('rendimientoChart', { static: false })
  rendimientoChart!: ElementRef<HTMLCanvasElement>;

  chart!: Chart;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Espera a que la vista esté lista
      setTimeout(() => this.inicializarGraficos(), 0);
    }
  }

  inicializarGraficos() {
    const canvas = this.rendimientoChart?.nativeElement;
    if (!canvas) return;

    if (this.chart) this.chart.destroy();

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 🎨 Creamos un degradado lineal vertical
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(37, 99, 235, 0.4)'); // Azul 600 (semi transparente)
    gradient.addColorStop(1, 'rgba(147, 197, 253, 0.05)'); // Azul claro 300 (muy suave)

    // 🚀 Inicializamos el gráfico
    this.chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Promedio General',
        data: [3.8, 4.0, 4.1, 4.2, 4.3, 4.2],
        borderColor: '#2563EB', // Azul Tailwind (blue-600)
        backgroundColor: gradient, // 👈 Relleno degradado
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#2563EB',
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  },
  options: {
    // 👇 Aquí agregas la animación 👇
    animation: {
      duration: 1200, // ⏱ tiempo de animación en ms
      easing: 'easeOutQuart' // 🌀 efecto suave
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: '#6B7280',
          //font: { weight: '500' }
        }
      },
      y: {
        beginAtZero: false,
        min: 3.5,
        max: 5.0,
        ticks: {
          color: '#6B7280',
          stepSize: 0.3
        },
        grid: {
          color: 'rgba(156, 163, 175, 0.2)'
        }
      }
    }
  }
});

  }

  ngOnDestroy(): void {
    if (this.chart) this.chart.destroy();
  }
}
