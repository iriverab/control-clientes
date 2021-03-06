import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css'],
})
export class EditarClienteComponent implements OnInit {
  cliente: Cliente | null = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0,
  };

  id: string;
  constructor(
    private clientesServicio: ClienteService,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.clientesServicio.getCliente(this.id).subscribe((cliente) => {
      this.cliente = cliente;
    });
  }
  guardar({ value, valid }: NgForm) {
    if (!valid)
      this.flashMessages.show('Por favor llena el formulario correctamente', {
        cssClass: 'alert-danger',
        timeout: 4000,
      });
    else value.id = this.id; //seteamos la variable del modelo
    this.clientesServicio.modificarCliente(value);
    this.router.navigate(['/']);
  }

  eliminar() {
    this.clientesServicio.eliminarCliente(this.cliente);
    this.router.navigate(['/']);
  }
}
