import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ necesario para *ngIf y *ngFor
import { RouterModule } from '@angular/router'; // ✅ necesario para routerLink
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.scss'],
})
export class MainLayoutComponent implements OnInit {
  isCollapsed = false;
  currentDate: Date = new Date();
  pageTitle: string = '';
  isMenuOpen: boolean = false;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private el: ElementRef,
    private authService: AuthService) { }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd), // Escucha solo cuando cambia la ruta
        map(() => {
          let route = this.activatedRoute.firstChild;
          while (route?.firstChild) route = route.firstChild;
          return route?.snapshot.data?.['title'] || 'Dashboard';
        })
      )
      .subscribe((title: string) => {
        this.pageTitle = title;
      });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logouts() {
    console.log("🔻 Logout iniciado");
    
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      },
      error: () => {
        // incluso si falla el logout en el backend
        this.authService.clearTokens();
        this.router.navigate(['/auth/login']);
      }
    });
  }

  // 3. Método para cerrar el menú al hacer clic fuera (HostListener)
  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    // Si el menú está abierto Y el clic no ocurrió dentro de este componente (elHeader)
    if (this.isMenuOpen && !this.el.nativeElement.contains(event.target)) {
      this.isMenuOpen = false;
    }
  }

  isSuperAdmin(): boolean {
    return this.authService.hasRole('SUPER_ADMIN');
  }

  isStudent(): boolean {
    return this.authService.hasRole('ESTUDIANTE');
  }

  isAdmin(): boolean {
    return this.authService.hasRole('ADMIN');
  }

  isDocente(): boolean {
    return this.authService.hasRole('DOCENTE');
  }
}