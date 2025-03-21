import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';  //Importa la configuración de la aplicación 
import { provideServerRendering } from '@angular/platform-server';  //Importa la configuración del servidor
import { provideServerRoutesConfig } from '@angular/ssr'; //Importa la configuración de las rutas del servidor
import { appConfig } from './app.config'; //Importa la configuración de la aplicación
import { serverRoutes } from './app.routes.server'; //Importa las rutas del servidor

/**
 * Configuración del servidor
 */
const serverConfig: ApplicationConfig = {
  providers: [  
    provideServerRendering(), 
    provideServerRoutesConfig(serverRoutes)
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);  //Exporta la configuración de la aplicación y del servidor 
  