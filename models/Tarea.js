// Patrón Factory
export function crearTarea(titulo, descripcion, prioridad, completada = false) {
  return {
    id: Date.now().toString(),
    titulo,
    descripcion,
    prioridad,
    completada,
    fecha: new Date().toLocaleDateString("es-MX"),
  };
}