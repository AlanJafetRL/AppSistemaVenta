import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../Interfaces/login';
import { UsuarioService } from '../../Services/usuario.service';
import { UtilidadService } from '../../Reutilizable/utilidad.service';

/**
 * Componente para página de login
 */
@Component({
  selector: 'app-login',
  //imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: false
})
export class LoginComponent implements OnInit {

  formularioLogin: FormGroup;
  ocultarPassword: boolean = true;
  mostrarLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _usuarioServicio: UsuarioService,
    private _utilidadServicio: UtilidadService
  ) {
    this.formularioLogin = this.fb.group({  //Formulario de login
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

  /**
   * Inicia sesión
   */
  iniciarSesion() { 

    this.mostrarLoading = true; //Muestra el loading

    const request: Login = {  //Petición de login
      correo: this.formularioLogin.value.email, 
      clave: this.formularioLogin.value.password
    };

    this._usuarioServicio.iniciarSesion(request).subscribe({  //Inicia sesión
      next: (data) => { 
        if (data.status) {  //Si hay respuesta
          this._utilidadServicio.guardarSesionUsuario(data.value);  //Guarda la sesión del usuario en el local storage
          this.router.navigate(['pages']);  //Redirige a la página de inicio de la aplicación
        } /* else if (data.status.toString()=="500") {
          this._utilidadServicio.mostrarAlerta('No se encontraron coincidencias', 'Opps!');
        } */  
       //Retiré esta comparación porque, por alguna razón, la API envia siempre 500, nunca envía false
      },
      complete: () => { //Cuando se completa la petición
        this.mostrarLoading = false;  //Oculta el loading
      },
      error: (data) => { 
        if (data.status.toString()=="500") {  //Si hay error 500
          this._utilidadServicio.mostrarAlerta('No se encontraron coincidencias', 'Opps!'); //Muestra alerta
        } else {  //Si hay otro error
          this._utilidadServicio.mostrarAlerta('Hubo un error', 'Changos!');  //Muestra alerta
          this.mostrarLoading = false;
        }

        this.mostrarLoading = false;  //Oculta el loading
      }

    })


  }

}
