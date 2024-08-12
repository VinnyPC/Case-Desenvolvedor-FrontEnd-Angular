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
    CommonModule, // Incluindo CommonModule
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
  dataFabricacaoValue: Date | null = null;
  dataValidadeValue: Date | null = null;

  tipos = [
    { value: 'lt', viewValue: 'Litro' },
    { value: 'kg', viewValue: 'Quilograma' },
    { value: 'un', viewValue: 'Unidade' },
  ];

  onSubmit() {
    if (!this.nomeItem || !this.unidadeMedida || !this.quantidade || !this.preco || !this.dataFabricacaoValue ||
      (this.perecivel === 'true' && !this.dataValidadeValue)) {
      console.log('Por favor, preencha todos os campos obrigatórios.');
    } else {
      console.log('Formulário enviado com sucesso!');
    }
  }
}
