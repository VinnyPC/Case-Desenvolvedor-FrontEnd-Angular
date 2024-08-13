import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    CurrencyMaskModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  perecivel: string = 'false';

  nomeItem: string = '';
  unidadeMedida: string = '';
  quantidade: number | null = null;
  preco: string = '';
  dataFabricacao: Date | null = null;
  dataValidade: Date | null = null;

  vencido:boolean = false
  fabricacaoInvalida:boolean = false


  tipos = [
    { value: 'lt', viewValue: 'Litro' },
    { value: 'kg', viewValue: 'Quilograma' },
    { value: 'un', viewValue: 'Unidade' },
  ];



  onSubmit() {

    if (!this.nomeItem || !this.unidadeMedida || this.quantidade === null || !this.preco || !this.dataFabricacao ||
      (this.perecivel === 'true' && !this.dataValidade)) {
      console.log('Erro nos campos');
      return;
    }

    // geracao de id com data para identificar dps
    const uniqueId = new Date().getTime();

    const formData = {
      id: uniqueId,
      nomeItem: this.nomeItem,
      unidadeMedida: this.unidadeMedida,
      quantidade: this.quantidade,
      preco: this.preco,
      dataFabricacaoValue: this.dataFabricacao?.toISOString(),
      dataValidadeValue: this.dataValidade?.toISOString(),
      perecivel: this.perecivel,
    };

    // adiciona/atualiza lista de itens
    let storedData = localStorage.getItem('formDataArray');
    let formDataArray = storedData ? JSON.parse(storedData) : [];
    formDataArray.push(formData);

    localStorage.setItem('formDataArray', JSON.stringify(formDataArray));
    console.log(formData);
  }

  getQuantidadeAddon(): string {
    switch (this.unidadeMedida) {
      case 'lt': return 'lt';
      case 'kg': return 'kg';
      case 'un': return 'un';
      default: return '';
    }
  }
  checkValidade(date: Date | null) {
    if (date) {
      const hoje = new Date();
      this.vencido = date.getTime() < hoje.getTime();
    } else {
      this.vencido = false;
    }
  }
  checkFabricacao(date: Date | null){
    if (date) {
      const hoje = new Date();
      this.fabricacaoInvalida = date.getTime() > hoje.getTime();
    }else {
      this.fabricacaoInvalida = false;
    }
  }

}