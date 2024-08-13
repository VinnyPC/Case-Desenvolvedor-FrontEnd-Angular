import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
export class CadastroComponent implements OnInit {
  @ViewChild('form') form: NgForm | undefined;

  perecivel: boolean = false;
  nomeItem: string = '';
  unidadeMedida: string = '';
  quantidade: number | null = null;
  preco: string = '';
  dataFabricacao: Date | null = null;
  dataValidade: Date | null = null;
  vencido: boolean = false;
  fabricacaoInvalida: boolean = false;
  quantidadeErro: string | null = null;

  durationInSeconds = 2;

  tipos = [
    { value: 'lt', viewValue: 'Litro' },
    { value: 'kg', viewValue: 'Quilograma' },
    { value: 'un', viewValue: 'Unidade' },
  ];

  constructor(private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const itemId = params['id'];
      if (itemId) {
        this.loadItemData(itemId);
      }
    });
  }

  loadItemData(itemId: string) {
    const storedData = localStorage.getItem('formDataArray');
    const formDataArray = storedData ? JSON.parse(storedData) : [];
    const item = formDataArray.find((data: any) => data.id === parseInt(itemId, 10));

    if (item) {
      this.nomeItem = item.nomeItem;
      this.unidadeMedida = item.unidadeMedida;
      this.quantidade = item.quantidade;
      this.preco = item.preco;
      this.dataFabricacao = item.dataFabricacaoValue ? new Date(item.dataFabricacaoValue) : null;
      this.dataValidade = item.dataValidadeValue ? new Date(item.dataValidadeValue) : null;
      this.perecivel = item.perecivel;
    }
  }

  validateQuantidade() {
    this.quantidadeErro = null;

    if (this.unidadeMedida === 'un') {
      if (!Number.isInteger(this.quantidade)) {
        this.quantidadeErro = 'A quantidade deve ser um valor inteiro.';
      }
      this.quantidade = Math.floor(this.quantidade ?? 0);
    } else if (this.unidadeMedida === 'lt' || this.unidadeMedida === 'kg') {
      this.quantidade = parseFloat((this.quantidade ?? 0).toFixed(3));
    }
  }

  cancelar() {
    this.router.navigate(['/listagem']);
  }

  onSubmit() {
    if (!this.nomeItem || !this.unidadeMedida || this.quantidade === null || !this.preco || !this.dataFabricacao ||
      (this.perecivel && (!this.dataValidade || this.vencido))) {
      console.log('Erro nos campos');
      return;
    }

    const itemId = this.route.snapshot.queryParams['id'];
    const uniqueId = itemId ? parseInt(itemId, 10) : new Date().getTime();

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

    let storedData = localStorage.getItem('formDataArray');
    let formDataArray = storedData ? JSON.parse(storedData) : [];

    const itemIndex = formDataArray.findIndex((data: any) => data.id === uniqueId);
    if (itemIndex !== -1) {
      formDataArray[itemIndex] = formData;
    } else {
      formDataArray.push(formData);
    }

    localStorage.setItem('formDataArray', JSON.stringify(formDataArray));
    console.log(formData);
    this.clearForm();
    this.snackBar.open('Operação salva com sucesso', 'Fechar', {
      duration: 3000
    });
  }

  clearForm() {
    this.nomeItem = '';
    this.unidadeMedida = '';
    this.quantidade = null;
    this.preco = '';
    this.dataFabricacao = null;
    this.dataValidade = null;
    this.perecivel = false;
    this.vencido = false;
    this.fabricacaoInvalida = false;
    this.form?.resetForm();
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

  checkFabricacao(date: Date | null) {
    if (date) {
      const hoje = new Date();
      this.fabricacaoInvalida = date.getTime() > hoje.getTime();
    } else {
      this.fabricacaoInvalida = false;
    }
  }
}