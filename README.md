# Gerenciador de produtos

 

O objetivo do projeto é ser um gerenciador de produtos que permite adicionar, ler, editar e deletar produtos que são armazenados em armazenamento local do navegador (localStorage).

 

 

 

 

## Rodando localmente

 

Para rodar o projeto localmente é necessário uma versão recente do node.

 

Clone o projeto

 

```bash

  git clone https://link-para-o-projeto

```

 

Entre no diretório do projeto

 

```bash

  cd my-project

```

 

Instale as dependências

 

```bash

  npm install

```

 

Inicie o servidor

 

```bash

  ng serve

```

 

 

# Funcionalidades

 

### Cadastro de itens

| Campo              | Tipo     | Obrigatório | Validação                                                                      |
|--------------------|----------|-------------|--------------------------------------------------------------------------------|
| Nome do item       | Texto    | Sim         | Máximo de 50 caracteres                                                        |
| Unidade de medida  | Select   | Sim         | Valores permitidos: `lt`, `kg`, `un`                                           |
| Quantidade         | Numérico | Não         | Dependente da unidade de medida                                                |
| Preço              | Numérico | Sim         | Valor monetário                                                                |
| Produto perecível  | Booleano | Sim         | Campo obrigatório para perecíveis                                              |
| Data de fabricação | Data     | Sim         | Validação contra a data de validade (o produto pode ser marcado como vencido)  |
| Data de validade   | Data     | Sim         | Deve ser posterior à data de fabricação                                        |
                                                                  

 

Ao clicar em "Salvar", é exibido uma mensagem de sucesso e o formulário é reiniciado.

 

### Exibir itens

Para exibir os itens salvos, basta abrir o menu no canto superior esquerdo da tela e clicar em "listagem".

 

### Atualizar ou excluir item

Na tela de listagem, cada item tem duas ações disponíveis: excluir e editar. Se clicar em editar, o usuário é redirecionado para a tela de cadastro, porém com os campos preenchidos com as informações do respectivo item.

 

Caso queira deletar, o usuário é questionado para confirmação e depois o item é deletado.
