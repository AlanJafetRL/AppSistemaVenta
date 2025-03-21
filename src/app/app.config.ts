import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideClientHydration, withEventReplay } from '@angular/platform-browser';  //Importa la configuración del cliente 
import { provideAnimations } from '@angular/platform-browser/animations'; //Importa las animaciones de la aplicación
import { provideHttpClient, withFetch } from '@angular/common/http';  //Importa el modulo de http de angular 
import { routes } from './app-routing.module';  //Importa las rutas de la aplicación

/**
 * Configuración de la aplicación
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), //Proporciona la detección de cambios de la zona
    provideRouter(routes),  //Proporciona las rutas de la aplicación
    provideClientHydration(withEventReplay()),  //Proporciona la hidratación del cliente 
    provideHttpClient(withFetch()), //Proporciona el cliente http 
    provideAnimations() //Proporciona las animaciones de la aplicación
  ]
};
