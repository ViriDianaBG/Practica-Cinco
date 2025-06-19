import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { TareaService } from '../services/tarea.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  tareas: any[] = [];
  tareasPendientes: number = 0;
  tareasCompletadas: number = 0;

  constructor(
    private tareaService: TareaService,
    private navCtrl: NavController
  ) {}

  async ngOnInit() {
    await this.cargarTareas();
  }

  async ionViewWillEnter() {
    await this.cargarTareas();
  }

  async cargarTareas() {
    this.tareas = await this.tareaService.obtenerTareas();
    this.tareasPendientes = await this.tareaService.contarTareasPendientes();
    this.tareasCompletadas = await this.tareaService.contarTareasCompletadas();
  }
  async toggleEstado(tarea: any) {
    tarea.estado = tarea.estado === 'completada' ? 'pendiente' : 'completada';
    await this.tareaService.actualizarTarea(tarea);
    await this.cargarTareas();
  }

  nuevaTarea() {
    this.navCtrl.navigateForward('/tarea');
  }

  editarTarea(tarea: any) {
    this.navCtrl.navigateForward(`/detalle-tarea/${tarea.id}`);
  }

  async eliminarTarea(id: number) {
    const tareas = await this.tareaService.obtenerTareas();
    const nuevasTareas = tareas.filter((t) => t.id !== id);
    await this.tareaService.guardarTareas(nuevasTareas);
    await this.cargarTareas();
  }
}
