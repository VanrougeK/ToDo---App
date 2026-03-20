// Patrón Singleton
class TareaController {
  constructor() {
    this.tareas = [];
  }

  agregar(tarea) {
    this.tareas.push(tarea);
  }

  eliminar(id) {
    this.tareas = this.tareas.filter((t) => t.id !== id);
  }

  toggleCompletada(id) {
    this.tareas = this.tareas.map((t) =>
      t.id === id ? { ...t, completada: !t.completada } : t,
    );
  }

  obtenerTodas() {
    return [...this.tareas];
  }

  validar(titulo, descripcion) {
    if (!titulo || titulo.trim() === "")
      return "El título no puede estar vacío";
    if (!descripcion || descripcion.trim() === "")
      return "La descripción no puede estar vacía";
    return null;
  }
}

export default new TareaController();
