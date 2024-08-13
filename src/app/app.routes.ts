import { Routes } from '@angular/router';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { ListagemComponent } from './components/listagem/listagem.component';

export const routes: Routes = [
    { path: '', component: CadastroComponent },
    { path: 'listagem', component: ListagemComponent },
    { path: 'cadastro', component: CadastroComponent },
];
