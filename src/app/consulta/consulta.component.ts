import { Component, inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cadastro/cliente';
import { CommonModule } from '@angular/common';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-consulta',
  imports: [MatInputModule, MatCardModule, FlexLayoutModule, MatIconModule, FormsModule, MatTableModule, MatButtonModule, CommonModule],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})
export class ConsultaComponent {

  nomeBusca: string = '';
  listaCliente: Cliente[] = [];
  colunasTable: string[] = ["id", "nome", "cpf", "dataNascimento", "email", "acoes"]
  snack: MatSnackBar = inject(MatSnackBar);

  constructor(
    private service: ClienteService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log("passando por aqui!");

    this.listaCliente = this.service.pesquisarClientes('');
  }

  pesquisar() {
    this.listaCliente = this.service.pesquisarClientes(this.nomeBusca)
  }

  preparaEditar(id: string) {
    this.router.navigate(['/cadastro'], { queryParams: { "id": id } })
  }

  preparaDeletar(cliente: Cliente) {
    cliente.deletando = true;
  }

  deletar(cliente: Cliente) {
    this.service.deletar(cliente);
    this.listaCliente = this.service.pesquisarClientes('');
    this.snack.open('Item deletado com sucesso!', 'Ok');
  }
}
