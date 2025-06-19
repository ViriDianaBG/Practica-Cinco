import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { TareaService } from '../services/tarea.service';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.page.html',
  styleUrls: ['./tarea.page.scss'],
  standalone: false,
})
export class TareaPage {
  tareaForm: FormGroup;
  tareas: any[] = [];

  constructor(
    private fb: FormBuilder,
    private tareaService: TareaService,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {
    this.tareaForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaVencimiento: ['', Validators.required],
      estado: ['pendiente', Validators.required], // permite elegir estado
    });
  }
  toggleEstado(tarea: any) {
    tarea.completada = !tarea.completada;
    // Aquí puedes agregar lógica adicional, como actualizar el estado en un servicio o almacenamiento
  }
  editarTarea(tarea: any) {
    // Aquí puedes implementar la lógica para editar la tarea,
    // por ejemplo, abrir un formulario de edición o navegar a otra página.
    // Ejemplo básico:
    console.log('Editar tarea:', tarea);
  }

  async guardarTarea() {
    if (this.tareaForm.invalid) {
      const toast = await this.toastCtrl.create({
        message: 'Completa todos los campos correctamente.',
        duration: 2000,
        color: 'danger',
      });
      await toast.present();
      return;
    }

    const nuevaTarea = {
      ...this.tareaForm.value,
      id: Date.now(),
    };

    await this.tareaService.agregarTarea(nuevaTarea);

    const toast = await this.toastCtrl.create({
      message: 'Tarea guardada exitosamente',
      duration: 2000,
      color: 'success',
    });
    await toast.present();

    this.navCtrl.navigateBack('/');
  }
  eliminarTarea(id: number) {
    // Implement logic to remove the task with the given id from your tareas array
    this.tareas = this.tareas.filter((tarea) => tarea.id !== id);
  }
  nuevaTarea() {
    // Lógica para crear una nueva tarea, por ejemplo, navegar a la vista de creación
    // Si usas Angular Router:
    // this.router.navigate(['/ruta-para-crear-tarea']);
    // O simplemente limpiar el formulario:
    // this.tareaForm.reset();
  }
  get tareasPendientes(): number {
    return this.tareas ? this.tareas.filter((t) => !t.completada).length : 0;
  }

  get tareasCompletadas(): number {
    return this.tareas ? this.tareas.filter((t) => t.completada).length : 0;
  }
}
