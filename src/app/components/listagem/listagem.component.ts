import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../../modal/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],

  templateUrl: './listagem.component.html',
  styleUrl: './listagem.component.css'
})
export class ListagemComponent implements OnInit {
  displayedColumns: string[] = ['nomeItem', 'dataFabricacaoValue', 'dataValidadeValue', 'quantidade', 'unidadeMedida', 'preco', 'perecivel', 'acoes'];
  dataSource: any[] = [];

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    try {
      const storedData = localStorage.getItem('formDataArray');
      this.dataSource = storedData ? JSON.parse(storedData) : [];
    } catch (error) {
      this.showNotification('Erro ao carregar dados', 'error');
    }
  }
  editItem(item: any) {
    this.router.navigate(['/form'], { queryParams: { id: item.id } });
  }
  async deleteItem(item: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { name: item.nomeItem }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        try {
          const storedData = localStorage.getItem('formDataArray');
          let formDataArray = storedData ? JSON.parse(storedData) : [];
          formDataArray = formDataArray.filter((data: any) => data.id !== item.id); // Filtra o item com base no ID
          localStorage.setItem('formDataArray', JSON.stringify(formDataArray));
          this.loadData();
          this.showNotification('Item excluído com sucesso', 'success');
        } catch (error) {
          this.showNotification('Erro ao excluir item', 'error');
        }
      }
    });
  }

  addItem() {
    this.router.navigate(['/']);
  }

  showNotification(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

}