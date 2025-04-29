# 📝 TP1-ES: Marketplace Minimalista
## 🎯 Objetivo e Features
📍Este projeto tem como objetivo desenvolver um marketplace minimalista. O foco é criar uma plataforma funcional onde usuários possam cadastrar, explorar e interagir com produtos à venda de maneira simples e eficiente. 

📍As principais funcionalidades são:
- Criar conta e fazer login para acessar o marketplace
- Cadastrar, editar e excluir produtos com nome, descrição, preço, foto e categoria
- Listar todos os produtos disponíveis
- Filtrar produtos por categoria
- Comentar em produtos e editar/excluir seus próprios comentários
- Avaliar produtos com notas de 1 a 5 estrelas


## 👨🏾‍💻 Membros
- Iago Nathan [Fullstack]
- Matheus Menezes [Fullstack]
- Matheus Melo [Fullstack]
- Cleiver [Fullstack]

## 🛠️ Tecnologias
- Framework: Next.js
- UI: HeroUI
- Banco de Dados: Cloud Firestore
- Banco de Arquivos: Cloud Storage for Firebase
- API de Pagamentos: Stripe

## 🔄 Backlogs
### Produto
1. Como usuário, quero criar uma conta para acessar o marketplace.
2. Como usuário, quero fazer login com meu e-mail e senha para acessar minha conta.
3. Como usuário, quero cadastrar produtos com nome, descrição, preço, foto e categoria para vendê-los no marketplace.
4. Como usuário, quero poder realizar e receber pagamentos.
5. Como usuário, quero editar os detalhes dos meus produtos para corrigir ou atualizar informações.
6. Como usuário, quero excluir meus produtos do marketplace para removê-los da venda.
7. Como usuário, quero visualizar uma lista de produtos disponíveis no marketplace.
8. Como usuário, quero filtrar produtos por categoria para encontrar o que procuro com mais facilidade.
9. Como usuário, quero comentar em produtos para compartilhar minha opinião.
10. Como usuário, quero dar uma nota de 1 a 5 estrelas para um produto.
11. Como usuário, quero editar ou excluir meus comentários caso mude de ideia ou cometa um erro.

### Sprint 1: Autenticação, produtos e filtragem
- **História #1: Criar conta**
  - **Tarefas e responsáveis:**
    - Criar interface de cadastro [Matheus Melo]
    - Implementar autenticação básica com Firebase Auth [Iago Nathan]
- **História #2: Login**
  - **Tarefas e responsáveis:**
    - Criar interface de login [Cleiver]
    - Validação e redirecionamento após login [Matheus Menezes]
   
- **História #3: Cadastro de produtos**
  - **Tarefas e responsáveis:**
    - Criar formulário de cadastro de produtos [Matheus Menezes]
    - Upload de imagem para o Firebase Storage [Cleiver]
      
- **História #4: Listagem de produtos**
  - **Tarefas e responsáveis:**
    - Implementar listagem a partir do Firestore [Matheus Melo]
    - Criar exibição de UI limpa [Iago Nathan]
- **História #5: Edição e exclusão de produtos**
  - **Tarefas e responsáveis:**
    - Botões de editar/excluir [Iago Nathan]
    - Endpoint Firestore para update/delete [Matheus Menezes]
    - Modal de confirmação de exclusão [Cleiver]
    - Interface de edição com dados carregados [Matheus Melo]
- **História #6: Filtragem por categoria**
  - **Tarefas e responsáveis:**
    - Chips de categoria e filtro visual [Matheus Menezes]
    - Componente na barra de navegação [Iago Nathan]
    - Query parametro e atualização da query [Cleiver]
    - Integração com Firestore [Matheus Melo]
### Sprint 2: Interações entre usuários (comentários, avaliações) e pagamentos
- **História #7: Comentários**
  - **Tarefas e responsáveis:**
      - Interface de comentários [Matheus Melo]
      - Salvar a listar comentários no Firestore [Cleiver]
- **História #8: Editar/Excluir comentários**
  - **Tarefas e responsáveis:**
    - Botões editar/excluir [Iago Nathan]
    - Controle de permissão para usuário [Matheus Menezes]
- **História #9: Avaliação com estrelas**
  - **Tarefas e responsáveis:**
    - Componente visual de estrelas [Matheus Menezes]
    - Lógica de salvar nota no Firestore [Cleiver]
    - Interace de pagamento [Matheus Menezes]
- **História #10: Pagamentos**
  - **Tarefas e responsáveis:**
    - Integração com Stripe (checkout) [Iago Nathan]
    - Lógica de vendedor receber valor [Cleiver]
    - Interface de pagamento [Matheus Menezes]  
## Diagramas
### Diagrama de Casos de Uso
Mostra o que os usuários podem fazer no sistema (cadastro, login, produtos, pagamentos etc).
[![alt text](<Diagrama de caso de uso.png>)](https://github.com/IagoNat/TP1-ES/blob/main/public/images/Diagrama%20de%20caso%20de%20uso.png)

### Diagrama de Classes
Mostra as entidades principais e suas relações (Usuário, Produto, Comentário, Avalição, Pagamento).
![alt text](<Diagrama de classes.png>)

### Diagrama de Sequência
Mostra o passo-a-passo de uma interação (ex: criar conta, comprar produto).
![alt text](<Diagrama de sequencia.png>)
