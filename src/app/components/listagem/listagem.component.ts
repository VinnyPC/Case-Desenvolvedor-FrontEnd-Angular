import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule],
  templateUrl: './listagem.component.html',
  styleUrl: './listagem.component.css'
})
export class ListagemComponent implements OnInit {
  displayedColumns: string[] = ['nomeItem', 'dataFabricacaoValue', 'dataValidadeValue', 'quantidade', 'unidadeMedida', 'preco', 'perecivel'];
  dataSource: any[] = [];

  ngOnInit() {
    this.loadData();
    
  }

  loadData() {
    
    const storedData = localStorage.getItem('formDataArray');
    this.dataSource = storedData ? JSON.parse(storedData) : [];

    console.log(this.dataSource)
  }
}
