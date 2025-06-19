import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TareaService } from '../services/tarea.service';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-detalle-tarea',
  templateUrl: './detalle-tarea.page.html',
  styleUrls: ['./detalle-tarea.page.scss'],
  standalone: false,
})
export class DetalleTareaPage implements OnInit {
  tareaForm: FormGroup;
  tareaId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private tareaService: TareaService,
    private fb: FormBuilder,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {
    this.tareaForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaVencimiento: ['', Validators.required],
    });
  }

  async ngOnInit() {
    this.tareaId = Number(this.route.snapshot.paramMap.get('id'));
    const tareas = await this.tareaService.obtenerTareas();
    const tarea = tareas.find((t) => t.id === this.tareaId);

    if (tarea) {
      this.tareaForm.patchValue({
        nombre: tarea.nombre,
        descripcion: tarea.descripcion,
        fechaVencimiento: tarea.fechaVencimiento,
      });
    }
  }

  async guardarCambios() {
    if (this.tareaForm.invalid) {
      const toast = await this.toastCtrl.create({
        message: 'Por favor, completa todos los campos.',
        duration: 2000,
        color: 'danger',
      });
      await toast.present();
      return;
    }

    const tareas = await this.tareaService.obtenerTareas();
    const index = tareas.findIndex((t) => t.id === this.tareaId);

    if (index !== -1) {
      tareas[index] = {
        ...tareas[index],
        ...this.tareaForm.value,
      };
      await this.tareaService.guardarTareas(tareas);

      const toast = await this.toastCtrl.create({
        message: 'Tarea actualizada correctamente',
        duration: 2000,
        color: 'success',
      });
      await toast.present();

      this.navCtrl.navigateBack('/');
    }
  }
}
