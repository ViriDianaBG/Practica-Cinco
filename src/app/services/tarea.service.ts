import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TareaService {
  private tareasKey = 'tareas';
  private idKey = 'ultimoId';

  constructor() {}

  private obtenerUltimoId(): number {
    const id = localStorage.getItem(this.idKey);
    return id ? parseInt(id, 10) : 0;
  }

  private guardarUltimoId(id: number): void {
    localStorage.setItem(this.idKey, id.toString());
  }

  async obtenerTareas(): Promise<any[]> {
    const data = localStorage.getItem(this.tareasKey);
    return data ? JSON.parse(data) : [];
  }

  async guardarTareas(tareas: any[]): Promise<void> {
    localStorage.setItem(this.tareasKey, JSON.stringify(tareas));
  }

  async agregarTarea(tarea: any): Promise<void> {
    const tareas = await this.obtenerTareas();
    const nuevoId = this.obtenerUltimoId() + 1;
    tarea.id = nuevoId;
    tarea.estado = 'pendiente'; // nuevo campo
    tareas.push(tarea);
    await this.guardarTareas(tareas);
    this.guardarUltimoId(nuevoId);
  }

  async obtenerTareaPorId(id: number): Promise<any | undefined> {
    const tareas = await this.obtenerTareas();
    return tareas.find((t) => t.id === id);
  }

  async actualizarTarea(tareaActualizada: any): Promise<void> {
    const tareas = await this.obtenerTareas();
    const index = tareas.findIndex((t) => t.id === tareaActualizada.id);
    if (index !== -1) {
      tareas[index] = tareaActualizada;
      await this.guardarTareas(tareas);
    }
  }

  async contarTareasPendientes(): Promise<number> {
    const tareas = await this.obtenerTareas();
    return tareas.filter((t) => t.estado !== 'completada').length;
  }

  async contarTareasCompletadas(): Promise<number> {
    const tareas = await this.obtenerTareas();
    return tareas.filter((t) => t.estado === 'completada').length;
  }
}
