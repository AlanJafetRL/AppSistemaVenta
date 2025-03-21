import { RenderMode, ServerRoute } from '@angular/ssr'; //Importa el modo de renderizado y las rutas del servidor

/**
 * Rutas del servidor
 */
export const serverRoutes: ServerRoute[] = [
  {
    path: '**',   //Ruta por defecto
    renderMode: RenderMode.Prerender  //Modo de renderizado prerender
  }
];
