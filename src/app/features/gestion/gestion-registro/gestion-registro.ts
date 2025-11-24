import { ChangeDetectorRef, Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/auth.models';
import { catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import Swal from 'sweetalert2';
import { Course } from '../../../core/models/courses.models';
import { CoursesService } from '../../../core/services/courses.service';
import { ClassroomsService } from '../../../core/services/classrooms.services';
import { Classrooms } from '../../../core/models/classrooms.models';

@Component({
  selector: 'app-gestion-registro',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gestion-registro.html',
  styleUrl: './gestion-registro.scss',
})
export class GestionRegistro {
  selectedTab: string = 'estudiantes-tab';
  estudianteForm: FormGroup;
  docenteForm: FormGroup;
  isSubmitting = false;
  //////////////////////////////// ESTUDIANTES ////////////////////////////////////////////
  estudiantes: User[] = [];
  filteredEstudiantes: User[] = [];
  searchTerm: string = '';
  buscarControl: FormControl = new FormControl('');
  //////////////////////////////// DOCENTES ////////////////////////////////////////////
  docentes: User[] = [];
  filtereDocentes: User[] = [];
  searchTermDocentes: string = '';
  buscarControlDocentes: FormControl = new FormControl('');
  ////////////////////////////////// ASIGNATURAS //////////////////////////////////////////
  asignatura: Course[] = [];
  filtereAsignatura: Course[] = [];
  searchTermAsignatura: string = '';
  buscarControlAsignatura: FormControl = new FormControl('');
  coursesForm: FormGroup;
  ////////////////////////////////// aulas ////////////////////////////////////////////////
  classrooms: Classrooms[] = [];
  filtereClassrooms: Classrooms[] = [];
  searchTermClassrooms: string = '';
  buscarControlClassrooms: FormControl = new FormControl('');
  classroomsForm: FormGroup;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private coursesService: CoursesService,
    private classroomsService: ClassroomsService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef) {
    this.estudianteForm = this.fb.group({
      name: ['', Validators.required],
      documentNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      dateOfBirth: ['', Validators.required]
    });

    this.docenteForm = this.fb.group({
      name: ['', Validators.required],
      documentNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      speciality: ['', Validators.required],
      academicDegree: ['', Validators.required]
    });

    this.coursesForm = this.fb.group({
      courseName: ['', Validators.required],
      courseCode: ['', Validators.required],
      capacity: ['', Validators.required],
      roomType: ['', Validators.required],
      credits: ['', Validators.required],
      location: ['', Validators.required],
      semester: ['', Validators.required]
    });

    this.classroomsForm = this.fb.group({
      roomName: ['', Validators.required],
      roomCode: ['', Validators.required],
      capacity: ['', Validators.required],
      roomType: ['', Validators.required]
    });

    this.getStudenst();
    this.setupFiltro();
    this.getDocente();
    this.setupFiltroDocente();
    this.getCourse();
    this.setupFiltroCourses();
    this.getAula();
    this.setupFiltroAulas();
  }

  getStudenst(){
    if (isPlatformBrowser(this.platformId)) {
      this.cargarEstudiantes();
    }
  }

  guardarEstudiante(): void {
    if (this.estudianteForm.invalid) {
      this.estudianteForm.markAllAsTouched();
      return;
    }

    const estudianteFormValue = this.estudianteForm.value;

    // Creamos el objeto User con el rol ESTUDIANTE
    const estudiante: User = {
      ...estudianteFormValue,
      roles: ['ESTUDIANTE']
    };

    this.userService.create(estudiante).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Estudiante registrado correctamente',
          timer: 2000,
          showConfirmButton: false
        });
        this.estudianteForm.reset();
        this.getStudenst();
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo registrar el estudiante',
        });
      },
    });
  }

  cargarEstudiantes(): void {
    this.userService.getListUserForRoles('ESTUDIANTE').pipe(
      catchError(err => {
        console.error('Error al cargar estudiantes', err);
        return of([] as User[]); // devuelve arreglo vacío si hay error
      })
    ).subscribe((data: User[]) => {
      this.estudiantes = data;
      this.filteredEstudiantes = data;
      this.cdr.detectChanges();
    });
  }

  selectTab(tabId: string) {
    this.selectedTab = tabId;
  }

  setupFiltro(): void {
    this.buscarControl.valueChanges.pipe(
      debounceTime(300),          // espera 300ms para no filtrar en cada tecla
      distinctUntilChanged()      // solo dispara si el valor cambió
    ).subscribe((term: string) => {
      this.filteredEstudiantes = this.filtrarEstudiantes(term);
      this.cdr.detectChanges();
    });
  }

  filtrarEstudiantes(term: string): User[] {
    if (!term) return this.estudiantes;

    term = term.toLowerCase();

    return this.estudiantes.filter(est => 
    (est.name ?? '').toLowerCase().includes(term) ||
    (est.email ?? '').toLowerCase().includes(term) ||
    (est.username ?? '').toLowerCase().includes(term)
  );
  }

  //DOCENTESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS

  guardarDocentes(): void {
    if (this.estudianteForm.invalid) {
      this.estudianteForm.markAllAsTouched();
      return;
    }

    const estudianteFormValue = this.estudianteForm.value;

    const estudiante: User = {
      ...estudianteFormValue,
      roles: ['DOCENTE']
    };

    this.userService.create(estudiante).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Docente registrado correctamente',
          timer: 2000,
          showConfirmButton: false
        });
        this.estudianteForm.reset();
        this.getStudenst();
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo registrar el Docente',
        });
      },
    });
  }

  cargarDocentes(): void {
    this.userService.getListUserForRoles('DOCENTE').pipe(
      catchError(err => {
        console.error('Error al cargar docentes', err);
        return of([] as User[]); // devuelve arreglo vacío si hay error
      })
    ).subscribe((data: User[]) => {
      this.docentes = data;
      this.filtereDocentes = data;
      this.cdr.detectChanges();
    });
  }

  setupFiltroDocente(): void {
    this.buscarControlDocentes.valueChanges.pipe(
      debounceTime(300),          // espera 300ms para no filtrar en cada tecla
      distinctUntilChanged()      // solo dispara si el valor cambió
    ).subscribe((term: string) => {
      this.filtereDocentes = this.filtrarEstudiantesDocente(term);
      this.cdr.detectChanges();
    });
  }

  filtrarEstudiantesDocente(term: string): User[] {
    if (!term) return this.docentes;

    term = term.toLowerCase();

    return this.docentes.filter(est => 
    (est.name ?? '').toLowerCase().includes(term) ||
    (est.email ?? '').toLowerCase().includes(term) ||
    (est.username ?? '').toLowerCase().includes(term)
  );
  }

  getDocente(){
    if (isPlatformBrowser(this.platformId)) {
      this.cargarDocentes();
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////// ASIGNATURAS /////////////////////////////////////////////////////////////////////////////////////////////////////


  guardarCourses(): void {
    if (this.coursesForm.invalid) {
      this.coursesForm.markAllAsTouched();
      return;
    }

    const coursesFormValue = this.coursesForm.value;

    const course: Course = {
      ...coursesFormValue    
    };

    this.coursesService.create(course).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Asignatura registrado correctamente',
          timer: 2000,
          showConfirmButton: false
        });
        this.estudianteForm.reset();
        this.getStudenst();
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo registrar la Asignatura',
        });
      },
    });
  }

  cargarCourses(): void {
    this.coursesService.getListCourses().pipe(
      catchError(err => {
        console.error('Error al cargar docentes', err);
        return of([] as Course[]); // devuelve arreglo vacío si hay error
      })
    ).subscribe((data: Course[]) => {
      this.asignatura = data;
      this.filtereAsignatura = data;
      this.cdr.detectChanges();
    });
  }

  setupFiltroCourses(): void {
    this.buscarControlAsignatura.valueChanges.pipe(
      debounceTime(300),          // espera 300ms para no filtrar en cada tecla
      distinctUntilChanged()      // solo dispara si el valor cambió
    ).subscribe((term: string) => {
      this.filtereAsignatura = this.filtrarAsignatura(term);
      this.cdr.detectChanges();
    });
  }

  filtrarAsignatura(term: string): Course[] {
    if (!term) return this.asignatura;

    term = term.toLowerCase();

    return this.asignatura.filter(est => 
    (est.courseCode ?? '').toLowerCase().includes(term) ||
    (est.courseName ?? '').toLowerCase().includes(term) ||
    (est.description ?? '').toLowerCase().includes(term)
  );
  }

  getCourse(){
    if (isPlatformBrowser(this.platformId)) {
      this.cargarCourses();
    }
  }
    ///////////////////////////////////////////////////////////////////////////////////////// AULA /////////////////////////////////////////////////////////////////////////////////////////////////////


   guardarAula(): void {
    if (this.classroomsForm.invalid) {
      this.classroomsForm.markAllAsTouched();
      return;
    }

    const classroomsFormValue = this.classroomsForm.value;

    const classrooms: Classrooms = {
      ...classroomsFormValue
    };

    this.classroomsService.create(classrooms).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'El Aula se ha registrado correctamente',
          timer: 2000,
          showConfirmButton: false
        });
        this.classroomsForm.reset();
        this.getAula();
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo registrar el Aula',
        });
      },
    });
  }

  cargarAula(): void {
    this.classroomsService.getListCourses().pipe(
      catchError(err => {
        console.error('Error al cargar Aula', err);
        return of([] as Classrooms[]); // devuelve arreglo vacío si hay error
      })
    ).subscribe((data: Classrooms[]) => {
      this.classrooms = data;
      this.filtereClassrooms = data;
      this.cdr.detectChanges();
    });
  }

  setupFiltroAulas(): void {
    this.buscarControlAsignatura.valueChanges.pipe(
      debounceTime(300),          // espera 300ms para no filtrar en cada tecla
      distinctUntilChanged()      // solo dispara si el valor cambió
    ).subscribe((term: string) => {
      this.filtereAsignatura = this.filtrarAsignatura(term);
      this.cdr.detectChanges();
    });
  }

  filtrarAula(term: string): Classrooms[] {
    if (!term) return this.classrooms;

    term = term.toLowerCase();

    return this.classrooms.filter(est => 
    (est.roomCode ?? '').toLowerCase().includes(term) ||
    (est.roomName ?? '').toLowerCase().includes(term) ||
    (est.roomType ?? '').toLowerCase().includes(term)
  );
  }

  getAula(){
    if (isPlatformBrowser(this.platformId)) {
      this.cargarAula();
    }
  } 

}
